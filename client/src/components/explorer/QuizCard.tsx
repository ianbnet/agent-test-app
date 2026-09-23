import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, GraduationCap, RotateCw, Trophy, X } from "lucide-react";
import type { StructureMeta } from "@shared/anatomy";
import type { LoadedModel } from "@/data/model";
import { useModel } from "@/data/modelContext";
import { SYSTEM_BY_ID } from "@/data/systems";
import { useExplorer, type QuizState } from "@/state/store";
import { cn } from "@/lib/utils";
import { visibility } from "@/three/visibility";
import { Seg } from "./primitives";

const BEST_KEY = "anatomica.quiz.best";

function readBest() {
  try {
    return parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

/** Structures that are plainly visible in the current dissection state. */
function questionPool(model: LoadedModel): StructureMeta[] {
  // Best: ask the GPU what is actually on screen from this camera.
  const counts = visibility.sample?.();
  if (counts && counts.size) {
    const total = [...counts.values()].reduce((a, b) => a + b, 0);
    const minPx = Math.max(6, total * 0.002);
    const seen = [...counts.entries()]
      .filter(([, n]) => n >= minPx)
      .map(([i]) => model.manifest.structures[i])
      .filter((s) => s && s.group !== "skin" && s.group !== "membrane");
    if (seen.length >= 4) return seen;
  }
  const st = useExplorer.getState();
  const exposed = Math.min(4, Math.round(st.peel));
  const ok = (s: StructureMeta) =>
    st.systems[s.system] && !st.hidden[s.id] && (!st.isolated || st.isolated.includes(s.id)) && s.triangles >= 150 && s.group !== "skin";
  const pool = model.manifest.structures.filter((s) => ok(s) && s.layer === exposed);
  if (pool.length >= 6) return pool;
  return model.manifest.structures.filter((s) => ok(s) && s.layer >= Math.floor(st.peel));
}

function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeQuestion(model: LoadedModel, mode: QuizState["mode"], prev?: string | null) {
  const pool = questionPool(model);
  if (!pool.length) return null;
  let target = pool[Math.floor(Math.random() * pool.length)];
  for (let tries = 0; tries < 5 && target.id === prev; tries++) target = pool[Math.floor(Math.random() * pool.length)];
  let options: string[] = [];
  if (mode === "name") {
    const names = new Set<string>([target.conceptName]);
    const similar = shuffle(pool.filter((s) => s.conceptName !== target.conceptName && (s.group === target.group || s.system === target.system)));
    const rest = shuffle(model.manifest.structures.filter((s) => s.conceptName !== target.conceptName && s.group === target.group));
    for (const s of [...similar, ...rest]) {
      if (names.size >= 4) break;
      names.add(s.conceptName);
    }
    options = shuffle([...names]);
  }
  return { target: target.id, options };
}

export function QuizCard() {
  const model = useModel();
  const quiz = useExplorer((s) => s.quiz);
  const [best, setBest] = useState(readBest);
  const [hint, setHint] = useState<string | null>(null);

  const update = useCallback((patch: Partial<QuizState>) => {
    const q = useExplorer.getState().quiz;
    if (q) useExplorer.setState({ quiz: { ...q, ...patch } });
  }, []);

  const next = useCallback(
    (mode?: QuizState["mode"]) => {
      const q = useExplorer.getState().quiz;
      if (!model || !q) return;
      const m = mode ?? q.mode;
      const question = makeQuestion(model, m, q.target);
      setHint(null);
      if (!question) {
        update({ mode: m, target: null, options: [], feedback: null });
        return;
      }
      update({ mode: m, target: question.target, options: question.options, feedback: null });
      if (m === "name") useExplorer.getState().focus([question.target]);
    },
    [model, update],
  );

  const answer = useCallback(
    (correct: boolean, picked?: string) => {
      const q = useExplorer.getState().quiz;
      if (!q || q.feedback) return;
      const streak = correct ? q.streak + 1 : 0;
      update({ feedback: { correct, picked }, score: q.score + (correct ? 1 : 0), streak, asked: q.asked + 1 });
      if (streak > best) {
        setBest(streak);
        try {
          localStorage.setItem(BEST_KEY, String(streak));
        } catch {
          /* ignore */
        }
      }
      if (!correct && q.target && q.mode === "find") useExplorer.getState().focus([q.target]);
    },
    [update, best],
  );

  // Taps on the body in "find it" mode.
  useEffect(() => {
    const onPick = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const q = useExplorer.getState().quiz;
      if (!q?.target || q.feedback || !model) return;
      const target = model.byId.get(q.target);
      const picked = model.byId.get(id);
      if (!target || !picked) return;
      if (picked.id === target.id) answer(true, id);
      else if (picked.concept === target.concept) setHint(`That's the ${picked.side} one — find the ${target.side} side.`);
      else answer(false, id);
    };
    window.addEventListener("anatomica:quiz-pick", onPick);
    return () => window.removeEventListener("anatomica:quiz-pick", onPick);
  }, [model, answer]);

  const target = quiz?.target && model ? model.byId.get(quiz.target) : undefined;
  const picked = quiz?.feedback?.picked && model ? model.byId.get(quiz.feedback.picked) : undefined;
  const accuracy = useMemo(() => (quiz && quiz.asked ? Math.round((quiz.score / quiz.asked) * 100) : null), [quiz]);
  if (!quiz || !model) return null;

  return (
    <div className="glass w-[min(440px,calc(100vw-20px))] rounded-2xl p-4 animate-fade-up">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" />
          <Seg
            value={quiz.mode}
            options={[
              { value: "find", label: "Find it" },
              { value: "name", label: "Name it" },
            ]}
            onChange={(m) => next(m)}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="chip !py-0.5 text-[11px] tabular-nums" title="Score">
            {quiz.score}/{quiz.asked}
            {accuracy !== null && <span className="text-muted-foreground">· {accuracy}%</span>}
          </span>
          <span className="chip !py-0.5 text-[11px] tabular-nums" title="Current streak · best">
            <Trophy className="h-3 w-3 text-[#f7c948]" /> {quiz.streak}
            <span className="text-muted-foreground">/ {best}</span>
          </span>
          <button type="button" className="icon-btn h-8 w-8" onClick={() => useExplorer.setState({ quiz: null })} aria-label="End quiz">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!target ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[13px] text-muted-foreground">Nothing to ask about with the current layers and systems. Show more of the body, then try again.</p>
          <button type="button" className="chip shrink-0" onClick={() => next()}>
            <RotateCw className="h-3.5 w-3.5" /> Try again
          </button>
        </div>
      ) : quiz.mode === "find" ? (
        <div className="mt-3">
          <div className="text-[12px] text-muted-foreground">Tap on the body to find</div>
          <div className="display mt-0.5 text-[26px] leading-tight text-white">{target.name}</div>
          <div className="mt-1 text-[11.5px] text-muted-foreground">{SYSTEM_BY_ID[target.system].label} system</div>
          {hint && !quiz.feedback && <div className="mt-2 text-[12.5px] text-[#f7c948]">{hint}</div>}
        </div>
      ) : (
        <div className="mt-3">
          <div className="text-[12px] text-muted-foreground">What is the highlighted structure?</div>
          <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {quiz.options.map((o) => {
              const isRight = o === target.conceptName;
              const chosen = quiz.feedback && picked?.conceptName === o;
              return (
                <button
                  key={o}
                  type="button"
                  disabled={!!quiz.feedback}
                  onClick={() => {
                    const pickedS = model.manifest.structures.find((s) => s.conceptName === o && (s.side === target.side || !s.side));
                    answer(isRight, isRight ? target.id : pickedS?.id);
                  }}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
                    !quiz.feedback && "border-white/10 bg-white/[0.03] hover:bg-white/[0.08]",
                    quiz.feedback && isRight && "border-[#39d98a]/60 bg-[#39d98a]/15 text-white",
                    quiz.feedback && !isRight && chosen && "border-[#ff4d5e]/60 bg-[#ff4d5e]/15",
                    quiz.feedback && !isRight && !chosen && "border-white/5 opacity-50",
                  )}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {quiz.feedback && target && (
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
          <div className={cn("flex items-center gap-2 text-[13px] font-medium", quiz.feedback.correct ? "text-[#39d98a]" : "text-[#ff7b87]")}>
            {quiz.feedback.correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {quiz.feedback.correct ? "Correct!" : picked && quiz.mode === "find" ? `That was the ${picked.name.toLowerCase()}.` : `It's the ${target.conceptName.toLowerCase()}.`}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground hover:brightness-110"
            onClick={() => next()}
          >
            Next <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {!quiz.feedback && target && (
        <div className="mt-3 flex justify-end">
          <button type="button" className="text-[12px] font-semibold text-muted-foreground hover:text-foreground" onClick={() => answer(false)}>
            Reveal answer
          </button>
        </div>
      )}
    </div>
  );
}

export function startQuiz(model: LoadedModel) {
  const st = useExplorer.getState();
  if (st.peel < 0.5) useExplorer.setState({ peel: 1 });
  const q = makeQuestion(model, "find");
  useExplorer.setState({
    quiz: { mode: "find", target: q?.target ?? null, options: q?.options ?? [], feedback: null, score: 0, streak: 0, asked: 0 },
    selected: null,
    sheet: null,
  });
}
