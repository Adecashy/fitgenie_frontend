
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  HeartPulse,
  Leaf,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  Target,
  Utensils,
  WandSparkles,
  Zap,
} from "lucide-react";

const API_URL = "https://fitgenie-backend-2izk.onrender.com/api";

const features = [
  {
    icon: Dumbbell,
    title: "Smart workouts",
    description: "Training sessions tailored to your fitness journey.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Utensils,
    title: "AI meal planning",
    description: "Meals designed around your nutrition preferences.",
    color: "from-lime-400 to-emerald-500",
  },
  {
    icon: Activity,
    title: "Progress focused",
    description: "A structured routine that helps you stay consistent.",
    color: "from-orange-400 to-pink-500",
  },
];

const getWeeklyPlan = (result) =>
  result?.plan?.weeklyPlan ||
  result?.data?.plan?.weeklyPlan ||
  result?.weeklyPlan ||
  [];

const getExercises = (workout) => {
  if (Array.isArray(workout?.exercises)) return workout.exercises;
  if (Array.isArray(workout?.workouts)) return workout.workouts;
  return [];
};

const getDayName = (day, index) => {
  if (typeof day?.day === "string") return day.day;
  if (typeof day?.name === "string") return day.name;
  return `Day ${index + 1}`;
};

export default function GeneratePlan() {
  const navigate = useNavigate();

  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);

  const fetchLatestPlan = useCallback(async () => {
    const token = JSON.parse(localStorage.getItem("token"))

    if (!token) {
      setLoadingPlan(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/fit-plan/latest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const result = await response.json();
      console.log(result)

      if (!response.ok) {
        if (response.status === 404) {
          setWeeklyPlan([]);
          setHasPlan(false);
          return;
        }

        throw new Error(result.message || "Could not load your latest plan.");
      }

      const plan = getWeeklyPlan(result);

      setWeeklyPlan(Array.isArray(plan) ? plan : []);
      setHasPlan(Array.isArray(plan) && plan.length > 0);
    } catch (error) {
      console.error("Fetch latest fitness plan:", error);
    } finally {
      setLoadingPlan(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestPlan();
  }, [fetchLatestPlan]);

  const handleGeneratePlan = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      toast.error("Please log in to generate your fitness plan.");
      navigate("/login");
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch(`${API_URL}/api/fit-plan/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || "We couldn't generate your plan. Please try again."
        );
      }

      toast.success(result.message || "Your fitness plan is ready!");

      const generatedPlan = getWeeklyPlan(result);

      if (Array.isArray(generatedPlan) && generatedPlan.length > 0) {
        setWeeklyPlan(generatedPlan);
        setHasPlan(true);
      } else {
        await fetchLatestPlan();
      }
    } catch (error) {
      console.error("Generate fitness plan:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const totalExercises = weeklyPlan.reduce(
    (total, day) => total + getExercises(day).length,
    0
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d1b] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute -left-40 top-[35rem] h-96 w-96 rounded-full bg-lime-400/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-300">
              <Sparkles size={14} />
              YOUR PERSONAL AI FITNESS STUDIO
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Your next level
              <span className="block bg-gradient-to-r from-lime-300 via-emerald-300 to-purple-400 bg-clip-text text-transparent">
                starts here.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Your goals. Your routine. Your plan. Let AI help you turn your
              fitness ambitions into a practical weekly program.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard/profile")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-lime-300/40 hover:bg-white/[0.08]"
            >
              <Target size={17} />
              View profile
            </button>
          </div>
        </div>

        {/* Main hero */}
        <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#21154b] via-[#171936] to-[#111b28] p-6 shadow-2xl shadow-purple-950/20 sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-300/10 px-3 py-1.5 text-xs font-medium text-purple-200">
                <WandSparkles size={14} />
                POWERED BY AI
              </div>

              <h2 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Stop guessing.
                <br />
                <span className="text-lime-300">Start progressing.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                Build a personalized fitness program with workouts and
                nutrition guidance based on the fitness information saved in
                your profile.
              </p>

              <button
                type="button"
                onClick={handleGeneratePlan}
                disabled={generating || loadingPlan}
                className="group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-lime-300 px-6 py-4 font-bold text-[#10150c] shadow-lg shadow-lime-300/10 transition duration-300 hover:-translate-y-0.5 hover:bg-lime-200 hover:shadow-lime-300/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {generating ? (
                  <>
                    <LoaderCircle size={20} className="animate-spin" />
                    Creating your plan...
                  </>
                ) : (
                  <>
                    <Sparkles size={19} />
                    {hasPlan ? "Generate a new plan" : "Generate my plan"}
                    <ArrowRight
                      size={19}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="mt-3 text-xs text-slate-400">
                <BadgeCheck size={14} className="mr-1 inline text-lime-300" />
                Personalized using your saved fitness profile
              </p>
            </div>

            {/* Decorative workout visualization */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-6 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative rounded-[2rem] border border-white/10 bg-[#0b1020]/70 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">YOUR FITNESS JOURNEY</p>
                    <p className="mt-1 font-bold">Made for your goals</p>
                  </div>
                  <div className="rounded-xl bg-lime-300/10 p-3 text-lime-300">
                    <Brain size={23} />
                  </div>
                </div>

                <div className="mb-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold">Workout plan</span>
                    <Dumbbell size={18} className="text-purple-300" />
                  </div>
                  <div className="flex gap-2">
                    {[65, 90, 45, 80, 55, 95, 40].map((height, index) => (
                      <div
                        key={index}
                        className="flex h-16 flex-1 items-end rounded-lg bg-white/5 p-1"
                      >
                        <div
                          style={{ height: `${height}%` }}
                          className={`w-full rounded-md ${
                            index === 1 || index === 5
                              ? "bg-lime-300"
                              : "bg-purple-400/80"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[10px] text-slate-400">
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                    <span>SUN</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-3 inline-flex rounded-xl bg-orange-400/10 p-2 text-orange-300">
                      <Flame size={18} />
                    </div>
                    <p className="text-xs text-slate-400">Training</p>
                    <p className="mt-1 text-sm font-bold">Goal-focused</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-3 inline-flex rounded-xl bg-emerald-400/10 p-2 text-emerald-300">
                      <Leaf size={18} />
                    </div>
                    <p className="text-xs text-slate-400">Nutrition</p>
                    <p className="mt-1 text-sm font-bold">Made for you</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-xl border border-lime-300/10 bg-lime-300/[0.06] p-3">
                  <div className="rounded-lg bg-lime-300/10 p-2 text-lime-300">
                    <Zap size={17} />
                  </div>
                  <p className="text-xs leading-5 text-slate-300">
                    <span className="font-semibold text-white">
                      Small steps. Big results.
                    </span>
                    <br />
                    Consistency is your superpower.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mb-10">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">
              Built around you
            </p>
            <h2 className="mt-2 text-xl font-bold sm:text-2xl">
              More than a workout plan
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05] sm:p-6"
              >
                <div
                  className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${color} p-3 text-[#10121a] shadow-lg transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105`}
                >
                  <Icon size={23} />
                </div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest plan */}
        <section className="rounded-[1.75rem] border border-white/10 bg-[#101626]/80 p-5 sm:p-7 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-purple-300">
                <CalendarDays size={17} />
                YOUR FITNESS LIBRARY
              </div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Your latest plan
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Pick up where you left off or create a fresh plan.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchLatestPlan}
              disabled={loadingPlan}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-50 sm:self-auto"
            >
              <RefreshCw
                size={15}
                className={loadingPlan ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {loadingPlan ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] py-12 text-sm text-slate-400">
              <LoaderCircle size={20} className="animate-spin text-lime-300" />
              Loading your fitness plan...
            </div>
          ) : hasPlan ? (
            <>
              <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
                <div className="rounded-2xl bg-purple-400/10 p-4">
                  <CalendarDays size={19} className="mb-3 text-purple-300" />
                  <p className="text-xs text-slate-400">Plan days</p>
                  <p className="mt-1 text-2xl font-extrabold">
                    {weeklyPlan.length}
                  </p>
                </div>
                <div className="rounded-2xl bg-lime-300/10 p-4">
                  <Dumbbell size={19} className="mb-3 text-lime-300" />
                  <p className="text-xs text-slate-400">Listed exercises</p>
                  <p className="mt-1 text-2xl font-extrabold">
                    {totalExercises}
                  </p>
                </div>
                <div className="col-span-2 rounded-2xl bg-orange-400/10 p-4 lg:col-span-1">
                  <HeartPulse size={19} className="mb-3 text-orange-300" />
                  <p className="text-xs text-slate-400">Next step</p>
                  <p className="mt-1 text-base font-bold">Stay consistent</p>
                </div>
              </div>

              <div className="space-y-3">
                {weeklyPlan.map((day, index) => {
                  const exercises = getExercises(day);

                  return (
                    <div
                      key={day._id || day.day || index}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-purple-400/30 sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400/20 to-indigo-400/20 text-purple-200">
                          <Dumbbell size={20} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold">
                            {getDayName(day, index)}
                          </h3>
                          <p className="mt-1 text-xs text-slate-400">
                            {exercises.length}{" "}
                            {exercises.length === 1 ? "exercise" : "exercises"}
                          </p>
                        </div>

                        <span className="rounded-lg bg-lime-300/10 px-2.5 py-1 text-xs font-semibold text-lime-300">
                          Day {index + 1}
                        </span>
                      </div>

                      {exercises.length > 0 && (
                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {exercises.slice(0, 4).map((exercise, exerciseIndex) => (
                            <div
                              key={exercise._id || exerciseIndex}
                              className="flex items-center gap-2 rounded-xl bg-white/[0.035] px-3 py-2.5"
                            >
                              <CheckCircle2
                                size={15}
                                className="shrink-0 text-lime-300"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-slate-200">
                                  {typeof exercise === "string"
                                    ? exercise
                                    : exercise.name ||
                                      exercise.exercise ||
                                      `Exercise ${exerciseIndex + 1}`}
                                </p>
                                {typeof exercise === "object" && (
                                  <p className="mt-0.5 text-xs text-slate-500">
                                    {[
                                      exercise.sets && `${exercise.sets} sets`,
                                      exercise.reps && `${exercise.reps} reps`,
                                    ]
                                      .filter(Boolean)
                                      .join(" · ") || "Included in your plan"}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {exercises.length > 4 && (
                        <p className="mt-3 text-xs text-slate-500">
                          +{exercises.length - 4} more exercises
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => navigate("/dashboard/history")}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime-300 transition hover:text-lime-200"
              >
                View plan history
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-10 text-center sm:py-12">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-lime-300/20">
                <Sparkles size={25} className="text-lime-300" />
              </div>
              <h3 className="text-lg font-bold">Your journey starts here</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                You haven't got a fitness plan to show yet. Generate your first
                personalized plan and start building healthy habits.
              </p>
              <button
                type="button"
                onClick={handleGeneratePlan}
                disabled={generating}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-3 text-sm font-bold transition hover:bg-purple-400 disabled:opacity-50"
              >
                {generating ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Sparkles size={17} />
                )}
                Create my first plan
                <ChevronRight size={17} />
              </button>
            </div>
          )}
        </section>

        {/* Footer tip */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-lime-300/10 bg-lime-300/[0.04] p-4 sm:items-center">
          <div className="rounded-xl bg-lime-300/10 p-2 text-lime-300">
            <Clock3 size={19} />
          </div>
          <p className="text-xs leading-5 text-slate-400 sm:text-sm">
            <span className="font-semibold text-slate-200">
              Before you generate:
            </span>{" "}
            Keep your fitness profile up to date so your plan reflects your
            current goals, activity level, and dietary preferences.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/update-profile")}
            className="ml-auto shrink-0 text-xs font-semibold text-lime-300 transition hover:text-lime-200"
          >
            Edit profile
          </button>
        </div>
      </div>
    </main>
  );
}
