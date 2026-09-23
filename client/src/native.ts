/**
 * Native shell integration (Capacitor on iOS/Android). No-ops on the web.
 */
import { Capacitor } from "@capacitor/core";
import { useExplorer } from "@/state/store";

export async function initNative() {
  if (!Capacitor.isNativePlatform()) return;
  document.documentElement.classList.add("native", Capacitor.getPlatform());
  const [{ StatusBar, Style }, { SplashScreen }, { Haptics, ImpactStyle }] = await Promise.all([
    import("@capacitor/status-bar"),
    import("@capacitor/splash-screen"),
    import("@capacitor/haptics"),
  ]);
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  if (Capacitor.getPlatform() === "android") StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});

  // Hide the splash once the first model is on screen.
  const unsub = useExplorer.subscribe((s) => {
    if (!s.loading) {
      SplashScreen.hide({ fadeOutDuration: 300 }).catch(() => {});
      unsub();
    }
  });

  // A light tap of feedback when a structure is selected or a quiz answer lands.
  useExplorer.subscribe((s, prev) => {
    if (s.selected && s.selected !== prev.selected) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    if (s.quiz?.feedback && !prev.quiz?.feedback)
      Haptics.impact({ style: s.quiz.feedback.correct ? ImpactStyle.Medium : ImpactStyle.Heavy }).catch(() => {});
  });
}
