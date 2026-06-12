(function () {
  const store = window.GymStore;
  const today = () => new Date().toISOString().slice(0, 10);
  const defaultAppName = "Gym Tracker";

  const workoutTemplates = [
    {
      id: "workout-a-foundation",
      type: "Upper",
      name: "Workout A — Foundation Push/Pull",
      focus: "Shoulder-friendly upper-body foundation. Stop 2-3 reps short of failure and progress by adding reps first.",
      notes: [
        "For pressing movements, keep discomfort at 0-3/10.",
        "If pain is sharp, worsening, or above 3/10, stop the exercise and reduce load or swap movement.",
        "Stop 2-3 reps short of failure.",
        "Progress by adding reps first, then weight."
      ],
      exercises: [
        { id: "standing-cable-chest-press", name: "Standing Cable Chest Press", sets: 3, repRange: "10-12", loadType: "pin", defaultLoad: "", target: "Choose light starting pin x 10-12", increment: 1, tip: "Use a comfortable neutral grip if possible. Slow controlled reps. Stop if shoulder/bicep discomfort rises above 3/10." },
        { id: "seated-cable-row", name: "Seated Cable Row", sets: 3, repRange: "8-10", loadType: "pin", defaultLoad: "4", increment: 1 },
        { id: "lat-pulldown", name: "Lat Pulldown", sets: 3, repRange: "8-10", loadType: "pin", defaultLoad: "3", increment: 1 },
        { id: "cable-face-pull", name: "Cable Face Pull", sets: 2, setLabel: "2-3 sets", repRange: "15-20", loadType: "pin", defaultLoad: "", target: "Light pin x 15-20", increment: 1, tip: "Rope attachment at face/chin height. Pull toward face, elbows high, squeeze shoulder blades, control the return." },
        { id: "lateral-raise", name: "Dumbbell Lateral Raise", sets: 3, repRange: "12-15", loadType: "kg", defaultLoad: "5", increment: 1 },
        { id: "hammer-curl", name: "Hammer Curl", sets: 3, repRange: "10-12", loadType: "kg", defaultLoad: "12.5", increment: 2.5 },
        { id: "rope-pushdown", name: "Rope Pushdown", sets: 3, repRange: "10-12", loadType: "pin", defaultLoad: "3", increment: 1 }
      ]
    },
    {
      id: "workout-b-legs-upper",
      type: "Full Body",
      name: "Workout B — Legs + Upper Body",
      focus: "Legs plus upper-body support, with goblet squat used as a tolerance check.",
      notes: [
        "Goblet squat is a tolerance check, not a strength test.",
        "Keep the weight light at first.",
        "Track whether the movement causes any discomfort."
      ],
      exercises: [
        { id: "goblet-squat", name: "Goblet Squat", sets: 2, repRange: "8-10", loadType: "kg", defaultLoad: "", increment: 2.5 },
        { id: "seated-leg-curl", name: "Seated Leg Curl", sets: 3, repRange: "10-12", loadType: "pin", defaultLoad: "", increment: 1 },
        { id: "leg-extension", name: "Leg Extension", sets: 2, repRange: "10-12", loadType: "pin", defaultLoad: "", increment: 1 },
        { id: "standing-cable-or-machine-chest-press", name: "Standing Cable Chest Press OR Machine Chest Press", sets: 3, repRange: "10-12", loadType: "pin", defaultLoad: "", target: "Choose light starting pin x 10-12", increment: 1, tip: "Keep elbows slightly tucked. Avoid explosive reps. Pain-free range only." },
        { id: "chest-supported-row", name: "Chest Supported Row", sets: 3, repRange: "8-10", loadType: "kg", defaultLoad: "", increment: 2.5 },
        { id: "cable-face-pull", name: "Cable Face Pull", sets: 2, setLabel: "2-3 sets", repRange: "15-20", loadType: "pin", defaultLoad: "", target: "Light pin x 15-20", increment: 1, tip: "Rope attachment at face/chin height. Pull toward face, elbows high, squeeze shoulder blades, control the return." },
        { id: "alternating-db-curl", name: "Alternating Dumbbell Curl", sets: 3, repRange: "10-12", loadType: "kg", defaultLoad: "", increment: 2.5 },
        { id: "plank", name: "Plank", sets: 3, repRange: "20-45 sec", loadType: "bodyweight", defaultLoad: "", increment: 0 }
      ]
    },
    {
      id: "workout-c-growth",
      type: "Full Body",
      name: "Workout C — Full Body Growth",
      focus: "Full-body growth with familiar push/pull work and an optional Week 4+ finisher.",
      notes: [
        "Optional Week 4+ finisher: choose one only.",
        "Progress by adding reps first, then weight."
      ],
      exercises: [
        { id: "standing-cable-chest-press", name: "Standing Cable Chest Press", sets: 3, repRange: "10-12", loadType: "pin", defaultLoad: "", target: "Choose light starting pin x 10-12", increment: 1, tip: "Use a comfortable neutral grip if possible. Slow controlled reps. Stop if shoulder/bicep discomfort rises above 3/10." },
        { id: "lat-pulldown", name: "Lat Pulldown", sets: 3, repRange: "8-10", loadType: "pin", defaultLoad: "3", increment: 1 },
        { id: "seated-cable-row", name: "Seated Cable Row", sets: 3, repRange: "8-10", loadType: "pin", defaultLoad: "4", increment: 1 },
        { id: "cable-face-pull", name: "Cable Face Pull", sets: 2, setLabel: "2-3 sets", repRange: "15-20", loadType: "pin", defaultLoad: "", target: "Light pin x 15-20", increment: 1, tip: "Rope attachment at face/chin height. Pull toward face, elbows high, squeeze shoulder blades, control the return." },
        { id: "lateral-raise", name: "Dumbbell Lateral Raise", sets: 3, repRange: "12-15", loadType: "kg", defaultLoad: "5", increment: 1 },
        { id: "hammer-curl", name: "Hammer Curl", sets: 3, repRange: "10-12", loadType: "kg", defaultLoad: "12.5", increment: 2.5 },
        { id: "rope-pushdown", name: "Rope Pushdown", sets: 3, repRange: "10-12", loadType: "pin", defaultLoad: "3", increment: 1 }
      ],
      finishers: [
        { id: "cable-fly", name: "Cable Fly", sets: 2, repRange: "12-15", loadType: "pin", defaultLoad: "", increment: 1 },
        { id: "incline-db-curl", name: "Incline Dumbbell Curl", sets: 2, repRange: "10-12", loadType: "kg", defaultLoad: "", increment: 2.5 }
      ]
    }
  ];

  const recoveryStatuses = ["Fresh", "Slightly sore", "Moderately sore", "Very sore"];
  const painStatuses = ["No pain", "Mild discomfort", "Moderate discomfort", "Stop exercise"];
  const defaultRatings = {
    energy: "",
    areaOneDiscomfort: "",
    areaTwoDiscomfort: "",
    sorenessBefore: ""
  };
  const legacyRatingKeys = {
    areaOneDiscomfort: atob("YmljZXBEaXNjb21mb3J0"),
    areaTwoDiscomfort: atob("aWJzRGlzY29tZm9ydA==")
  };

  const buddyMessages = [
    "Clean reps beat ego reps.",
    "One more rep than last time is progress.",
    "Rest 45 seconds, then attack the next set.",
    "Form first. Beast mode second.",
    "Log it now or future-you will make things up."
  ];

  const state = {
    view: store.read(store.keys.view, "dashboard"),
    active: null,
    appName: store.read(store.keys.appName, defaultAppName),
    timerRemaining: 45,
    timerHandle: null
  };

  const views = {
    dashboard: document.getElementById("view-dashboard"),
    library: document.getElementById("view-library"),
    log: document.getElementById("view-log"),
    history: document.getElementById("view-history"),
    weight: document.getElementById("view-weight"),
    timer: document.getElementById("view-timer")
  };

  const toast = document.getElementById("toast");
  const appTitle = document.getElementById("app-title");

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function seedSampleData() {
    if (store.read(store.keys.seeded, false)) return;

    try {
      const response = await fetch("./data/sample-workouts.json");
      const sample = await response.json();
      store.write(store.keys.history, sample.workouts);
      store.write(store.keys.seeded, true);
    } catch (error) {
      const fallback = makeSampleWorkout();
      store.write(store.keys.history, [fallback]);
      store.write(store.keys.seeded, true);
    }
  }

  function makeSampleWorkout() {
    return {
      id: "sample-first-workout",
      date: "2026-06-02",
      completedAt: "2026-06-02T09:00:00.000Z",
      templateId: "workout-a-foundation",
      recoveryStatus: recoveryStatuses[0],
      sessionRatings: {
        energy: "8",
        areaOneDiscomfort: "1",
        areaTwoDiscomfort: "0",
        sorenessBefore: "2"
      },
      name: "Workout A — Foundation Push/Pull",
      source: "Sample first workout",
      complete: true,
      exercises: [
        makeExercise("standing-cable-chest-press", "Standing Cable Chest Press", "pin", "1", [12, 12, 12]),
        makeExercise("seated-cable-row", "Seated Cable Row", "pin", "4", [10, 10, 10]),
        makeExercise("lat-pulldown", "Lat Pulldown", "pin", "3", [10, 10, 10]),
        makeExercise("cable-face-pull", "Cable Face Pull", "pin", "1", [15, 15]),
        makeExercise("lateral-raise", "Dumbbell Lateral Raise", "kg", "5", [12, 12, 12]),
        makeExercise("hammer-curl", "Hammer Curl", "kg", "12.5", [12, 12, 12]),
        makeExercise("rope-pushdown", "Rope Pushdown", "pin", "3", [12, 12, 12])
      ],
      notes: "Sample completed session. Personal notes are only stored locally when entered in the app."
    };
  }

  function makeExercise(id, name, loadType, load, reps, painStatus = painStatuses[0], notes = "") {
    return {
      id,
      name,
      loadType,
      sets: reps.map((rep) => ({ load, reps: String(rep), done: true })),
      painStatus,
      notes
    };
  }

  function getHistory() {
    return store.read(store.keys.history, []);
  }

  function saveHistory(history) {
    store.write(store.keys.history, history);
  }

  function getWeights() {
    return store.read(store.keys.weights, []);
  }

  function saveWeights(weights) {
    store.write(store.keys.weights, weights);
  }

  function getTemplate(templateId) {
    return workoutTemplates.find((template) => template.id === templateId) || workoutTemplates[0];
  }

  function getExerciseTemplate(exerciseId, templateId) {
    const template = getTemplate(templateId);
    const allExercises = workoutTemplates.flatMap((item) => [
      ...item.exercises,
      ...(item.finishers || [])
    ]);

    return template.exercises.find((exercise) => exercise.id === exerciseId)
      || (template.finishers || []).find((exercise) => exercise.id === exerciseId)
      || allExercises.find((exercise) => exercise.id === exerciseId)
      || { id: exerciseId, name: exerciseId, sets: 3, repRange: "8-12", loadType: "kg", defaultLoad: "", increment: 2.5 };
  }

  function createWorkoutFromTemplate(templateId, options = {}) {
    const template = getTemplate(templateId);
    const selectedFinisher = template.finishers?.find((finisher) => finisher.id === options.finisherId);
    const exercises = selectedFinisher ? [...template.exercises, selectedFinisher] : template.exercises;

    return {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      date: today(),
      templateId: template.id,
      recoveryStatus: options.recoveryStatus || recoveryStatuses[0],
      sessionRatings: { ...defaultRatings },
      name: template.name,
      complete: false,
      exercises: exercises.map((exercise) => {
        const target = suggestedTarget(exercise);

        return {
          id: exercise.id,
          name: exercise.name,
          loadType: exercise.loadType,
          target: target.target,
          repRange: exercise.repRange,
          tip: exercise.tip || "",
          sets: Array.from({ length: exercise.sets }, () => ({
            load: target.load,
            reps: "",
            done: false
          })),
          painStatus: painStatuses[0],
          notes: ""
        };
      }),
      notes: ""
    };
  }

  function getActiveWorkout() {
    const saved = store.read(store.keys.activeWorkout, null);
    if (saved) return saved;

    return createWorkoutFromTemplate(workoutTemplates[0].id);
  }

  function startWorkout(templateId) {
    const recoveryInput = document.getElementById(`recovery-${templateId}`);
    const finisherInput = document.getElementById(`finisher-${templateId}`);
    state.active = createWorkoutFromTemplate(templateId, {
      recoveryStatus: recoveryInput?.value || recoveryStatuses[0],
      finisherId: finisherInput?.value || ""
    });
    saveActive();
    showToast(`${getTemplate(templateId).name} started.`);
    setView("log");
  }

  function editSavedWorkout(workoutId) {
    const workout = getHistory().find((entry) => entry.id === workoutId);
    if (!workout) {
      showToast("Saved workout not found.");
      return;
    }

    state.active = normalizeLegacyActive({
      ...JSON.parse(JSON.stringify(workout)),
      editingHistoryId: workout.id
    });
    saveActive();
    showToast("Workout loaded for editing.");
    setView("log");
  }

  function normalizeLegacyActive(workout) {
    if (!workout) return workout;
    const templateId = workout.templateId || workoutTemplates[0].id;
    const legacyRatings = workout.sessionRatings || {};

    const normalized = {
      ...workout,
      templateId,
      recoveryStatus: workout.recoveryStatus || recoveryStatuses[0],
      sessionRatings: {
        ...defaultRatings,
        ...legacyRatings,
        areaOneDiscomfort: legacyRatings.areaOneDiscomfort ?? legacyRatings[legacyRatingKeys.areaOneDiscomfort] ?? "",
        areaTwoDiscomfort: legacyRatings.areaTwoDiscomfort ?? legacyRatings[legacyRatingKeys.areaTwoDiscomfort] ?? ""
      },
      exercises: workout.exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        loadType: exercise.loadType,
        target: exercise.target || suggestedTarget(getExerciseTemplate(exercise.id, templateId)).target,
        repRange: exercise.repRange || getExerciseTemplate(exercise.id, templateId).repRange,
        tip: exercise.tip || getExerciseTemplate(exercise.id, templateId).tip || "",
        sets: exercise.sets,
        painStatus: exercise.painStatus || painStatuses[0],
        notes: exercise.notes || ""
      }))
    };

    return normalized;
  }

  function saveActive() {
    store.write(store.keys.activeWorkout, state.active);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function applyAppName() {
    const name = state.appName?.trim() || defaultAppName;
    if (appTitle) appTitle.textContent = name;
    document.title = name;

    const appleTitle = document.querySelector("meta[name='apple-mobile-web-app-title']");
    if (appleTitle) appleTitle.setAttribute("content", name);
  }

  function setView(view) {
    if (state.view === "log") syncLogFormToActive();
    state.view = view;
    store.write(store.keys.view, view);
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.view === view);
    });
    Object.entries(views).forEach(([name, element]) => {
      element.classList.toggle("active", name === view);
    });
    render();
  }

  function completedStats(workout) {
    const total = workout.exercises.reduce((count, exercise) => count + exercise.sets.length, 0);
    const done = workout.exercises.reduce((count, exercise) => {
      return count + exercise.sets.filter((set) => set.done).length;
    }, 0);
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function formatLoad(exercise, load) {
    if (exercise.loadType === "bodyweight") return "BW";
    if (!load) return "-";
    return exercise.loadType === "pin" ? `Pin ${load}` : `${load}kg`;
  }

  function formatSets(exercise) {
    return exercise.sets
      .map((set) => `${formatLoad(exercise, set.load)} x ${set.reps || "-"}`)
      .join(", ");
  }

  function formatSetsWithStatus(exercise) {
    return exercise.sets
      .map((set, index) => {
        const status = set.done ? "done" : "not done";
        return `Set ${index + 1}: ${formatLoad(exercise, set.load)} x ${set.reps || "-"} (${status})`;
      })
      .join("; ");
  }

  function setCountLabel(count) {
    return `${count} ${count === 1 ? "set" : "sets"}`;
  }

  function exerciseSetLabel(exercise) {
    return exercise.setLabel || setCountLabel(exercise.sets);
  }

  function completedHistory() {
    return getHistory().filter((workout) => workout.complete !== false);
  }

  function workoutTimestamp(workout) {
    return new Date(workout.completedAt || `${workout.date || today()}T00:00:00`).getTime();
  }

  function getLatestCompleted(history = completedHistory()) {
    return [...history].sort((a, b) => workoutTimestamp(b) - workoutTimestamp(a))[0] || null;
  }

  function startOfWeek(date = new Date()) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = copy.getDay() || 7;
    copy.setDate(copy.getDate() - day + 1);
    copy.setHours(0, 0, 0, 0);
    return copy;
  }

  function localDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function ratingValue(workout, key) {
    const ratings = workout?.sessionRatings || {};
    const legacyKey = legacyRatingKeys[key] || key;
    const value = Number.parseFloat(ratings[key] ?? ratings[legacyKey]);
    return Number.isFinite(value) ? value : null;
  }

  function averageRating(history, key) {
    const values = history.map((workout) => ratingValue(workout, key)).filter((value) => value !== null);
    if (!values.length) return "-";
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    return average.toFixed(1).replace(/\.0$/, "");
  }

  function currentWorkoutStreak(history) {
    const dates = [...new Set(history.map((workout) => workout.date).filter(Boolean))]
      .sort((a, b) => b.localeCompare(a));
    if (!dates.length) return 0;

    let streak = 1;
    let expected = new Date(`${dates[0]}T00:00:00`);
    for (let index = 1; index < dates.length; index += 1) {
      expected.setDate(expected.getDate() - 1);
      const expectedDate = localDateKey(expected);
      if (dates[index] !== expectedDate) break;
      streak += 1;
    }
    return streak;
  }

  function formatRating(workout, key, suffix = "/10") {
    const value = ratingValue(workout, key);
    return value === null ? "-" : `${value}${suffix}`;
  }

  function slugify(value) {
    return String(value || "export")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "export";
  }

  function workoutFileName(workout, suffix, extension) {
    return `${workout.date || today()}-${slugify(workout.name)}-${suffix}.${extension}`;
  }

  function findHistoryWorkout(workoutId) {
    return getHistory().find((workout) => workout.id === workoutId);
  }

  function renderOptions(options, selected) {
    return options.map((option) => `
      <option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>
    `).join("");
  }

  function icon(name) {
    return `<span class="icon icon-${name}" aria-hidden="true"></span>`;
  }

  function templateType(template) {
    if (template.id.includes("lower")) return { label: "Lower", className: "type-lower" };
    if (template.id.includes("recovery")) return { label: "Recovery", className: "type-recovery" };
    if (template.id.includes("upper")) return { label: "Upper", className: "type-upper" };
    return { label: "Full Body", className: "type-full" };
  }

  function exerciseIconName(exercise) {
    if (exercise.loadType === "bodyweight") return "bodyweight";
    if (exercise.name.toLowerCase().includes("timer") || exercise.repRange.includes("sec") || exercise.repRange.includes("min")) return "timer";
    return "dumbbell";
  }

  function findPreviousExercise(exerciseId) {
    for (const workout of getHistory()) {
      if (workout.complete === false) continue;
      const match = workout.exercises.find((exercise) => exercise.id === exerciseId);
      if (match) return { workout, exercise: match };
    }
    return null;
  }

  function numeric(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function volume(exercise) {
    return exercise.sets.reduce((total, set) => total + numeric(set.load) * numeric(set.reps), 0);
  }

  function bestSetScore(exercise) {
    return exercise.sets.reduce((best, set) => {
      if (!set.done && !set.reps) return best;
      const load = exercise.loadType === "bodyweight" ? 0 : numeric(set.load);
      const reps = numeric(set.reps);
      return {
        load: Math.max(best.load, load),
        reps: Math.max(best.reps, reps),
        volume: Math.max(best.volume, load * reps)
      };
    }, { load: 0, reps: 0, volume: 0 });
  }

  function isBestEffort(exercise, previous) {
    if (!previous) return false;

    const current = bestSetScore(exercise);
    const last = bestSetScore(previous.exercise);

    if (exercise.loadType === "bodyweight") {
      return current.reps > 0 && current.reps > last.reps;
    }

    return (current.load > last.load && current.reps > 0)
      || (current.load >= last.load && current.reps > last.reps)
      || (current.volume > last.volume && current.volume > 0);
  }

  function targetTop(template) {
    const matches = template.repRange.match(/\d+/g) || [];
    return Number(matches[matches.length - 1]) || 12;
  }

  function suggestedTarget(template) {
    const previous = findPreviousExercise(template.id);
    const top = targetTop(template);

    if (!previous) {
      if (!template.defaultLoad && template.loadType !== "bodyweight") {
        return {
          load: "",
          target: template.target || `${template.loadType === "pin" ? "Choose starting pin" : "Choose starting load"} x ${template.repRange}`
        };
      }

      return {
        load: template.defaultLoad,
        target: template.target || (template.loadType === "bodyweight" ? template.repRange : `${formatLoad(template, template.defaultLoad)} x ${template.repRange}`)
      };
    }

    const previousSets = previous.exercise.sets.filter((set) => set.done && numeric(set.reps) > 0);
    const lastLoad = previousSets.find((set) => set.load)?.load || template.defaultLoad;
    const hitTop = previousSets.length >= template.sets && previousSets.every((set) => numeric(set.reps) >= top);
    const nextLoad = template.increment && hitTop ? String(numeric(lastLoad) + template.increment) : lastLoad;

    if (template.loadType === "bodyweight") {
      return { load: "", target: hitTop ? `Repeat ${template.repRange} with cleaner control` : `Beat last time: ${formatSets(previous.exercise)}` };
    }

    return {
      load: nextLoad,
      target: `${formatLoad(template, nextLoad)} x ${template.repRange}`
    };
  }

  function progressionSuggestion(exercise, template) {
    if (!exercise) {
      return `Start target: ${suggestedTarget(template).target}. Keep discomfort in the safe range and log this movement when you start it.`;
    }

    const completeSets = exercise.sets.filter((set) => set.done && numeric(set.reps) > 0);
    const top = targetTop(template);
    const allTop = completeSets.length === exercise.sets.length && completeSets.every((set) => numeric(set.reps) >= top);
    const previous = findPreviousExercise(exercise.id);
    const label = template.loadType === "pin" ? "pin" : "kg";

    if (!completeSets.length && previous) {
      return `Suggested target: ${suggestedTarget(template).target}. Last time: ${formatSets(previous.exercise)}.`;
    }

    if (!completeSets.length) {
      return `Start target: ${suggestedTarget(template).target}. Keep two clean reps in reserve.`;
    }

    if (completeSets.length < exercise.sets.length) {
      return "Keep logging the remaining sets before changing the load.";
    }

    if (template.loadType === "bodyweight") {
      return `You hit the target. Next time aim for smoother control or the top of ${template.repRange}.`;
    }

    if (allTop) {
      const nextLoad = numeric(completeSets[0].load) + template.increment;
      const nextLabel = template.loadType === "pin" ? `Pin ${nextLoad}` : `${nextLoad}kg`;
      return `You hit the top of the rep range. Next time try ${nextLabel}, or repeat this ${label} if form felt shaky.`;
    }

    const lowestRep = Math.min(...completeSets.map((set) => numeric(set.reps)));
    return `Repeat this load and aim to bring the lowest set from ${lowestRep} toward ${top} reps.`;
  }

  function renderDashboard() {
    const history = getHistory();
    const completed = completedHistory();
    const weights = getWeights();
    const latest = getLatestCompleted(completed);
    const stats = completedStats(state.active);
    const lastWeight = weights[0];
    const activeTemplate = getTemplate(state.active.templateId);
    const buddyMessage = buddyMessages[(new Date().getDay() + history.length) % buddyMessages.length];
    const weekStart = startOfWeek();
    const thisWeek = completed.filter((workout) => workoutTimestamp(workout) >= weekStart.getTime());
    const nextSuggestions = activeTemplate.exercises.slice(0, 3).map((template) => {
      const activeExercise = state.active.exercises.find((exercise) => exercise.id === template.id);
      return `<div class="summary-line"><span>${escapeHtml(template.name)}</span><strong>${escapeHtml(progressionSuggestion(activeExercise, template))}</strong></div>`;
    }).join("");

    views.dashboard.innerHTML = `
      <div class="gym-buddy-hero">
        <img src="./assets/images/tiger-gym-buddy.png" alt="Photorealistic tiger gym buddy in a dark modern gym" onerror="this.hidden = true">
        <div class="gym-buddy-overlay">
          <p class="eyebrow">Gym Buddy</p>
          <h2>Gym Buddy</h2>
          <p>Today's mission: beat last time by one clean rep.</p>
        </div>
      </div>
      <div class="panel primary">
        <p class="section-kicker">Today</p>
        <h2 id="dashboard-title">Dashboard</h2>
        <p class="muted">${escapeHtml(state.active.name)} is loaded. Choose a different day from the workout library whenever you want.</p>
        <p class="safety-note">For pressing movements, keep discomfort at 0-3/10. If pain is sharp, worsening, or above 3/10, stop the exercise and reduce load or swap movement.</p>
        <p class="buddy-says"><strong>Gym Buddy says:</strong> ${escapeHtml(buddyMessage)}</p>
        <div class="progress-track" aria-label="Workout completion">
          <div class="progress-fill" style="width: ${stats.pct}%"></div>
        </div>
        <p class="small">${stats.done}/${stats.total} sets complete today</p>
        <div class="quick-grid">
          <button class="button-primary" type="button" data-go="library">Choose workout</button>
          <button class="button-primary" type="button" data-go="log">Log workout</button>
          <button class="button-secondary" type="button" data-go="history">Exercise history</button>
          <button class="button-secondary" type="button" data-go="timer">Rest timer</button>
        </div>
      </div>
      <div class="panel">
        <p class="section-kicker">App Name</p>
        <div class="app-name-control">
          <div>
            <label for="app-name-input">Display name</label>
            <input id="app-name-input" value="${escapeHtml(state.appName)}" placeholder="${escapeHtml(defaultAppName)}" data-app-name>
          </div>
          <button class="button-secondary" type="button" data-save-app-name>Save</button>
        </div>
      </div>
      <div class="panel">
        <p class="section-kicker">Data Transfer</p>
        <h3>Move Local Data</h3>
        <p class="muted">Export before changing domains, then import on the new URL. This only reads and writes this app's local data.</p>
        <div class="data-transfer-actions">
          <button class="button-primary" type="button" data-export-data>Export data</button>
          <button class="button-secondary" type="button" data-import-data>Import data</button>
          <input id="import-data-file" class="visually-hidden" type="file" accept="application/json,.json" data-import-file>
        </div>
      </div>
      <div class="metric-grid">
        <div class="metric"><span class="small">${icon("history")} This week</span><strong>${thisWeek.length}</strong></div>
        <div class="metric"><span class="small">${icon("target")} Streak</span><strong>${currentWorkoutStreak(completed)}</strong></div>
        <div class="metric"><span class="small">${icon("history")} Last workout</span><strong>${latest ? escapeHtml(latest.date) : "-"}</strong></div>
        <div class="metric"><span class="small">${icon("target")} Avg energy</span><strong>${averageRating(thisWeek, "energy")}</strong></div>
        <div class="metric"><span class="small">${icon("target")} Avg area 1</span><strong>${averageRating(thisWeek, "areaOneDiscomfort")}</strong></div>
        <div class="metric"><span class="small">${icon("target")} Avg area 2</span><strong>${averageRating(thisWeek, "areaTwoDiscomfort")}</strong></div>
        <div class="metric"><span class="small">${icon("bodyweight")} Last body weight</span><strong>${lastWeight ? `${escapeHtml(lastWeight.weight)}kg` : "-"}</strong></div>
      </div>
      <div class="panel">
        <p class="section-kicker">Progress</p>
        <h3>Previous Workout</h3>
        ${latest ? `<p class="muted">${escapeHtml(latest.name)} on ${escapeHtml(latest.date)}</p><p>${escapeHtml(latest.exercises.map(formatSets).join(" | "))}</p>` : "<p class=\"muted\">No workout history yet.</p>"}
      </div>
      <div class="media-panel progress-media">
        <img src="./assets/images/dumbbells-closeup.png" alt="Close-up of a dumbbell in a dark gym" onerror="this.hidden = true">
        <div class="media-panel-content">
          <p class="section-kicker">Target</p>
          <h3>One clean rep beats guessing.</h3>
          <p class="muted">Log today while the numbers are still fresh.</p>
        </div>
      </div>
      <div class="panel">
        <p class="section-kicker">Target</p>
        <h3>Progression Suggestions</h3>
        ${nextSuggestions}
      </div>
    `;
  }

  function renderLibrary() {
    views.library.innerHTML = `
      <div class="media-panel library-hero">
        <img src="./assets/images/tiger-action.png" alt="Tiger moving through a dark gym" onerror="this.hidden = true">
        <div class="media-panel-content">
          <p class="section-kicker">Workout Library</p>
          <h2 id="library-title">Choose Today's Workout</h2>
          <p class="muted">Pick the session that matches your energy, then start logging.</p>
        </div>
      </div>
      <div class="panel primary">
        <p class="section-kicker">Library</p>
        <h2>Templates</h2>
        <p class="muted">Starting a workout creates a fresh local session from that template. Your previous matching exercise results stay available for targets and comparisons.</p>
      </div>
      <div class="library-list">
        ${workoutTemplates.map((template) => {
          const type = templateType(template);
          const recoveryId = `recovery-${template.id}`;
          const finisherId = `finisher-${template.id}`;

          return `
          <article class="template-card">
            <div class="template-header">
              <div>
                <h3>${escapeHtml(template.name)}</h3>
                <p class="muted">${escapeHtml(template.focus)}</p>
              </div>
              <span class="badge ${type.className}">${escapeHtml(type.label)}</span>
            </div>
            <div class="exercise-summary">
              ${template.exercises.map((exercise) => {
                const previous = findPreviousExercise(exercise.id);
                const target = suggestedTarget(exercise);

                return `
                  <div class="template-exercise">
                    <div>
                      <strong>${icon(exerciseIconName(exercise))}${escapeHtml(exercise.name)}</strong>
                      <span class="small">${escapeHtml(exerciseSetLabel(exercise))}, ${escapeHtml(exercise.repRange)}</span>
                    </div>
                    <p class="small">${previous ? `LAST TIME ${escapeHtml(formatSets(previous.exercise))}` : "LAST TIME none yet"}</p>
                    <p class="suggestion compact">${escapeHtml(target.target)}</p>
                    ${exercise.tip ? `<p class="small exercise-tip">${escapeHtml(exercise.tip)}</p>` : ""}
                  </div>
                `;
              }).join("")}
            </div>
            ${template.notes?.length ? `
              <div class="note-list">
                ${template.notes.map((note) => `<span class="pill">${escapeHtml(note)}</span>`).join("")}
              </div>
            ` : ""}
            <div class="template-controls">
              <div>
                <label for="${escapeHtml(recoveryId)}">Recovery status</label>
                <select id="${escapeHtml(recoveryId)}">
                  ${renderOptions(recoveryStatuses, recoveryStatuses[0])}
                </select>
              </div>
              ${template.finishers?.length ? `
                <div>
                  <label for="${escapeHtml(finisherId)}">Optional Week 4+ finisher</label>
                  <select id="${escapeHtml(finisherId)}">
                    <option value="">No finisher</option>
                    ${template.finishers.map((finisher) => `
                      <option value="${escapeHtml(finisher.id)}">${escapeHtml(finisher.name)} - ${escapeHtml(exerciseSetLabel(finisher))}, ${escapeHtml(finisher.repRange)}</option>
                    `).join("")}
                  </select>
                </div>
              ` : ""}
            </div>
            <button class="button-primary" type="button" data-start-template="${escapeHtml(template.id)}">Start workout</button>
          </article>
        `;
        }).join("")}
      </div>
    `;
  }

  function renderLog() {
    const stats = completedStats(state.active);
    const exercises = state.active.exercises.map((exercise, exerciseIndex) => {
      const template = getExerciseTemplate(exercise.id, state.active.templateId);
      const previous = findPreviousExercise(exercise.id);
      const bestEffort = isBestEffort(exercise, previous);
      const loadLabel = exercise.loadType === "pin" ? "Pin" : exercise.loadType === "bodyweight" ? "Load" : "kg";
      const setRows = exercise.sets.map((set, setIndex) => `
        <div class="set-row">
          <div class="set-number">${setIndex + 1}</div>
          <div>
            <label for="load-${exercise.id}-${setIndex}">${loadLabel}</label>
            <input id="load-${exercise.id}-${setIndex}" inputmode="decimal" value="${escapeHtml(set.load)}" placeholder="${exercise.loadType === "bodyweight" ? "BW" : ""}" data-set-field="load" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" ${exercise.loadType === "bodyweight" ? "disabled" : ""}>
          </div>
          <div>
            <label for="reps-${exercise.id}-${setIndex}">${template.repRange.includes("sec") || template.repRange.includes("min") ? "Reps/time" : "Reps"}</label>
            <input id="reps-${exercise.id}-${setIndex}" inputmode="numeric" value="${escapeHtml(set.reps)}" data-set-field="reps" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">
          </div>
          <button class="set-check ${set.done ? "done" : ""}" type="button" aria-label="Toggle set ${setIndex + 1}" data-toggle-set data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">${set.done ? "Done" : "Set"}</button>
        </div>
      `).join("");

      return `
        <article class="exercise-card">
          <div class="exercise-header">
            <div>
              <h3>${escapeHtml(exercise.name)}</h3>
              <div class="exercise-meta">
                <span class="pill">${icon(exerciseIconName(template))}${escapeHtml(exerciseSetLabel(template))}, ${escapeHtml(template.repRange)}</span>
                <span class="pill">${icon("target")}${escapeHtml(exercise.target || suggestedTarget(template).target)}</span>
              </div>
              <div class="comparison">
                ${previous ? `<strong>LAST TIME</strong> ${escapeHtml(formatSets(previous.exercise))}` : "<strong>LAST TIME</strong> No previous session for this exercise yet."}
              </div>
              ${bestEffort ? "<div class=\"best-effort\">New best effort 🐯</div>" : ""}
              <div class="suggestion">${escapeHtml(progressionSuggestion(exercise, template))}</div>
              ${exercise.tip || template.tip ? `<p class="small exercise-tip">${escapeHtml(exercise.tip || template.tip)}</p>` : ""}
            </div>
            <span class="badge">${exercise.loadType === "bodyweight" ? "BW" : `${Math.round(volume(exercise))} vol`}</span>
          </div>
          <div class="set-list">${setRows}</div>
          <div class="set-tools">
            <button class="button-secondary" type="button" data-add-set data-exercise-index="${exerciseIndex}">Add set</button>
            <button class="button-secondary" type="button" data-remove-set data-exercise-index="${exerciseIndex}" ${exercise.sets.length <= template.sets ? "disabled" : ""}>Remove extra set</button>
          </div>
          <div class="exercise-controls">
            <div>
              <label for="pain-${exercise.id}-${exerciseIndex}">Pain / discomfort</label>
              <select id="pain-${exercise.id}-${exerciseIndex}" data-exercise-field="painStatus" data-exercise-index="${exerciseIndex}">
                ${renderOptions(painStatuses, exercise.painStatus || painStatuses[0])}
              </select>
            </div>
            <div>
              <label for="exercise-note-${exercise.id}-${exerciseIndex}">Exercise note</label>
              <textarea id="exercise-note-${exercise.id}-${exerciseIndex}" rows="2" placeholder="Optional note" data-exercise-field="notes" data-exercise-index="${exerciseIndex}">${escapeHtml(exercise.notes || "")}</textarea>
            </div>
          </div>
        </article>
      `;
    }).join("");

    const ratings = { ...defaultRatings, ...(state.active.sessionRatings || {}) };
    views.log.innerHTML = `
      <div class="panel primary">
        <p class="section-kicker">Workout Logging</p>
        <h2 id="log-title">${escapeHtml(state.active.name)}</h2>
        <p class="small">Recovery status: ${escapeHtml(state.active.recoveryStatus || recoveryStatuses[0])}</p>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${stats.pct}%"></div>
        </div>
        <p class="small">${stats.done}/${stats.total} sets complete</p>
        <p class="small autosave-note">Autosaves while you type. Switching tabs keeps the current log values on this device.</p>
        <div class="workout-actions">
          <button class="button-primary" type="button" data-finish-workout>${state.active.editingHistoryId ? "Save changes" : "Finish workout"}</button>
          ${state.active.editingHistoryId ? "<button class=\"button-secondary\" type=\"button\" data-cancel-edit>Cancel edit</button>" : ""}
          ${state.active.editingHistoryId ? "" : "<button class=\"button-secondary\" type=\"button\" data-reset-active>New blank workout</button>"}
        </div>
        ${state.active.editingHistoryId ? "<p class=\"small edit-mode\">Editing a saved workout. Cancel discards local edits and keeps the saved history unchanged.</p>" : ""}
      </div>
      ${exercises}
      <div class="panel">
        <p class="section-kicker">Session Ratings</p>
        <div class="rating-grid">
          <div>
            <label for="rating-energy">Energy</label>
            <input id="rating-energy" type="number" inputmode="numeric" min="1" max="10" value="${escapeHtml(ratings.energy)}" placeholder="1-10" data-rating-field="energy">
          </div>
          <div>
            <label for="rating-area-one">Area 1 discomfort</label>
            <input id="rating-area-one" type="number" inputmode="numeric" min="0" max="10" value="${escapeHtml(ratings.areaOneDiscomfort)}" placeholder="0-10" data-rating-field="areaOneDiscomfort">
          </div>
          <div>
            <label for="rating-area-two">Area 2 discomfort</label>
            <input id="rating-area-two" type="number" inputmode="numeric" min="0" max="10" value="${escapeHtml(ratings.areaTwoDiscomfort)}" placeholder="0-10" data-rating-field="areaTwoDiscomfort">
          </div>
          <div>
            <label for="rating-soreness">Soreness before</label>
            <input id="rating-soreness" type="number" inputmode="numeric" min="0" max="10" value="${escapeHtml(ratings.sorenessBefore)}" placeholder="0-10" data-rating-field="sorenessBefore">
          </div>
        </div>
      </div>
      <div class="panel">
        <label for="workout-notes">Session notes</label>
        <textarea id="workout-notes" data-workout-notes>${escapeHtml(state.active.notes || "")}</textarea>
      </div>
    `;
  }

  function renderHistory() {
    const history = getHistory();
    views.history.innerHTML = `
      ${history.length ? "" : `
        <div class="media-panel">
          <img src="./assets/images/gym-equipment.png" alt="Dark gym equipment and dumbbell racks" onerror="this.hidden = true">
          <div class="media-panel-content">
            <p class="section-kicker">History</p>
            <h2 id="history-title">No sessions yet</h2>
            <p class="muted">Finish a workout and your history will live here.</p>
          </div>
        </div>
      `}
      <div class="panel primary">
        <p class="section-kicker">Exercise History</p>
        <h2 ${history.length ? "id=\"history-title\"" : ""}>Workout History</h2>
        <p class="muted">Saved locally on this device. Your sample first workout is loaded here automatically.</p>
        <div class="history-export-actions">
          <button class="button-primary" type="button" data-export-history-ai>Export all for AI</button>
          <button class="button-secondary" type="button" data-print-history>PDF-style report</button>
        </div>
      </div>
      ${history.map((workout) => {
        const normalized = normalizeLegacyActive(workout);
        return `
        <article class="history-card">
          <header>
            <div>
              <h3>${escapeHtml(normalized.name)}</h3>
              <p class="small">${escapeHtml(normalized.date)} ${normalized.complete ? "Complete" : "In progress"}</p>
            </div>
            <div class="history-actions">
              <span class="badge">${normalized.exercises.length} moves</span>
              <button class="button-secondary" type="button" data-edit-history="${escapeHtml(normalized.id)}" aria-label="Edit ${escapeHtml(normalized.name)} from ${escapeHtml(normalized.date)}">Edit</button>
              <button class="button-secondary" type="button" data-export-workout-ai="${escapeHtml(normalized.id)}" aria-label="Export ${escapeHtml(normalized.name)} for AI">AI</button>
              <button class="button-secondary" type="button" data-print-workout="${escapeHtml(normalized.id)}" aria-label="Open PDF-style report for ${escapeHtml(normalized.name)}">Report</button>
            </div>
          </header>
          <div class="history-meta">
            <span><strong>Recovery</strong>${escapeHtml(normalized.recoveryStatus || recoveryStatuses[0])}</span>
            <span><strong>Energy</strong>${escapeHtml(formatRating(normalized, "energy"))}</span>
            <span><strong>Area 1</strong>${escapeHtml(formatRating(normalized, "areaOneDiscomfort"))}</span>
            <span><strong>Area 2</strong>${escapeHtml(formatRating(normalized, "areaTwoDiscomfort"))}</span>
          </div>
          <div class="exercise-summary">
            ${normalized.exercises.map((exercise) => `
              <div class="summary-line">
                <span>${escapeHtml(exercise.name)}</span>
                <strong>${escapeHtml(formatSets(exercise))}</strong>
              </div>
              ${exercise.painStatus && exercise.painStatus !== painStatuses[0] ? `<p class="small exercise-history-note">${escapeHtml(exercise.painStatus)}${exercise.notes ? ` - ${escapeHtml(exercise.notes)}` : ""}</p>` : ""}
            `).join("")}
          </div>
          ${normalized.notes ? `<p class="muted">${escapeHtml(normalized.notes)}</p>` : ""}
        </article>
      `;
      }).join("")}
    `;
  }

  function renderWeight() {
    const weights = getWeights();
    views.weight.innerHTML = `
      <div class="panel primary">
        <p class="section-kicker">Body Weight</p>
        <h2 id="weight-title">Weight Tracking</h2>
        <div class="form-grid">
          <div>
            <label for="weight-date">Date</label>
            <input id="weight-date" type="date" value="${today()}">
          </div>
          <div>
            <label for="weight-value">kg</label>
            <input id="weight-value" inputmode="decimal" placeholder="82.5">
          </div>
        </div>
        <button class="button-primary" type="button" data-save-weight>Save weight</button>
      </div>
      <div class="panel">
        <h3>Recent Entries</h3>
        <div class="weight-list">
          ${weights.length ? weights.map((entry) => `
            <div class="weight-row">
              <span>${escapeHtml(entry.date)}</span>
              <strong>${escapeHtml(entry.weight)}kg</strong>
            </div>
          `).join("") : "<p class=\"muted\">No body weight entries yet.</p>"}
        </div>
      </div>
    `;
  }

  function renderTimer() {
    views.timer.innerHTML = `
      <div class="panel primary">
        <p class="section-kicker">Rest</p>
        <h2 id="timer-title">Timer</h2>
        <div class="timer-face">
          <img src="./assets/images/tiger-gym-buddy.png" alt="" aria-hidden="true" onerror="this.hidden = true">
          <strong id="timer-display">${formatTime(state.timerRemaining)}</strong>
        </div>
        <div class="timer-actions">
          <button class="button-primary" type="button" data-timer="45">45s</button>
          <button class="button-primary" type="button" data-timer="60">60s</button>
          <button class="button-primary" type="button" data-timer="90">90s</button>
          <button class="button-primary" type="button" data-timer="120">120s</button>
          <button class="button-secondary" type="button" data-timer-stop>Stop</button>
        </div>
      </div>
    `;
  }

  function render() {
    renderDashboard();
    renderLibrary();
    renderLog();
    renderHistory();
    renderWeight();
    renderTimer();
  }

  function renderWithoutJump() {
    const scrollX = window.scrollX || 0;
    const scrollY = window.scrollY || 0;
    render();
    if (window.scrollTo) window.scrollTo(scrollX, scrollY);
  }

  function updateSet(input) {
    const exercise = state.active.exercises[Number(input.dataset.exerciseIndex)];
    const set = exercise.sets[Number(input.dataset.setIndex)];
    set[input.dataset.setField] = input.value;
    saveActive();
  }

  function syncLogFormToActive() {
    if (!state.active) return;

    document.querySelectorAll("[data-set-field]").forEach((input) => {
      const exercise = state.active.exercises[Number(input.dataset.exerciseIndex)];
      const set = exercise?.sets?.[Number(input.dataset.setIndex)];
      if (set) set[input.dataset.setField] = input.value;
    });

    document.querySelectorAll("[data-exercise-field]").forEach((input) => {
      const exercise = state.active.exercises[Number(input.dataset.exerciseIndex)];
      if (exercise) exercise[input.dataset.exerciseField] = input.value;
    });

    document.querySelectorAll("[data-rating-field]").forEach((input) => {
      state.active.sessionRatings = { ...defaultRatings, ...(state.active.sessionRatings || {}) };
      state.active.sessionRatings[input.dataset.ratingField] = input.value;
    });

    const notes = document.querySelector("[data-workout-notes]");
    if (notes) state.active.notes = notes.value;

    saveActive();
  }

  function updateExerciseField(input) {
    const exercise = state.active.exercises[Number(input.dataset.exerciseIndex)];
    exercise[input.dataset.exerciseField] = input.value;
    saveActive();
  }

  function updateRating(input) {
    state.active.sessionRatings = { ...defaultRatings, ...(state.active.sessionRatings || {}) };
    state.active.sessionRatings[input.dataset.ratingField] = input.value;
    saveActive();
  }

  function toggleSet(button) {
    const exercise = state.active.exercises[Number(button.dataset.exerciseIndex)];
    const set = exercise.sets[Number(button.dataset.setIndex)];
    set.done = !set.done;
    if (set.done && !set.reps) set.reps = "12";
    saveActive();
    renderWithoutJump();
  }

  function addSet(button) {
    const exercise = state.active.exercises[Number(button.dataset.exerciseIndex)];
    const previousSet = exercise.sets[exercise.sets.length - 1] || { load: "", reps: "" };
    exercise.sets.push({
      load: exercise.loadType === "bodyweight" ? "" : previousSet.load,
      reps: "",
      done: false
    });
    saveActive();
    renderWithoutJump();
  }

  function removeSet(button) {
    const exercise = state.active.exercises[Number(button.dataset.exerciseIndex)];
    const template = getExerciseTemplate(exercise.id, state.active.templateId);
    if (exercise.sets.length <= template.sets) return;

    exercise.sets.pop();
    saveActive();
    renderWithoutJump();
  }

  function finishWorkout() {
    syncLogFormToActive();
    state.active = normalizeLegacyActive(state.active);
    const stats = completedStats(state.active);
    const editingHistoryId = state.active.editingHistoryId;
    const entry = {
      ...state.active,
      id: editingHistoryId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      editingHistoryId: undefined,
      completedAt: state.active.completedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      complete: stats.done === stats.total
    };

    if (editingHistoryId) {
      saveHistory(getHistory().map((workout) => workout.id === editingHistoryId ? entry : workout));
    } else {
      saveHistory([entry, ...getHistory()].slice(0, 100));
    }

    store.remove(store.keys.activeWorkout);
    state.active = getActiveWorkout();
    showToast(editingHistoryId ? "Workout changes saved." : entry.complete ? "Workout complete and saved." : "Workout saved to history.");
    setView("history");
  }

  function resetActiveWorkout() {
    store.remove(store.keys.activeWorkout);
    state.active = createWorkoutFromTemplate(state.active.templateId || workoutTemplates[0].id);
    saveActive();
    showToast("Blank workout ready.");
    renderWithoutJump();
  }

  function cancelWorkoutEdit() {
    store.remove(store.keys.activeWorkout);
    state.active = getActiveWorkout();
    showToast("Edit cancelled. Saved workout unchanged.");
    setView("history");
  }

  function saveWeight() {
    const date = document.getElementById("weight-date").value || today();
    const weight = document.getElementById("weight-value").value.trim();
    if (!weight) {
      showToast("Add a weight first.");
      return;
    }
    const weights = [{ date, weight }, ...getWeights().filter((entry) => entry.date !== date)]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 200);
    saveWeights(weights);
    showToast("Weight saved.");
    renderWeight();
  }

  function saveAppName() {
    const input = document.getElementById("app-name-input");
    state.appName = input?.value.trim() || defaultAppName;
    store.write(store.keys.appName, state.appName);
    applyAppName();
    showToast("App name saved locally.");
    renderDashboard();
  }

  function workoutAiText(workout, index = 1) {
    const normalized = normalizeLegacyActive(workout);
    const lines = [
      `## Workout ${index}: ${normalized.name}`,
      `Date: ${normalized.date || "-"}`,
      `Completed: ${normalized.complete ? "Yes" : "No"}`,
      `Recovery status: ${normalized.recoveryStatus || "-"}`,
      `Energy: ${formatRating(normalized, "energy")}`,
      `Area 1 discomfort: ${formatRating(normalized, "areaOneDiscomfort")}`,
      `Area 2 discomfort: ${formatRating(normalized, "areaTwoDiscomfort")}`,
      `Soreness before: ${formatRating(normalized, "sorenessBefore")}`,
      "",
      "Exercises:"
    ];

    normalized.exercises.forEach((exercise) => {
      lines.push(`- ${exercise.name}`);
      lines.push(`  - Load type: ${exercise.loadType || "-"}`);
      lines.push(`  - Target: ${exercise.target || exercise.repRange || "-"}`);
      lines.push(`  - Sets: ${exercise.sets.map((set, setIndex) => {
        const status = set.done ? "done" : "not done";
        return `Set ${setIndex + 1}: ${formatLoad(exercise, set.load)} x ${set.reps || "-"} (${status})`;
      }).join("; ")}`);
      if (exercise.painStatus) lines.push(`  - Discomfort: ${exercise.painStatus}`);
      if (exercise.notes) lines.push(`  - Exercise note: ${exercise.notes}`);
    });

    lines.push("");
    lines.push(`Session notes: ${normalized.notes || "-"}`);
    return lines.join("\n");
  }

  function historyAiText(workouts) {
    const normalized = workouts.map(normalizeLegacyActive);
    const completed = normalized.filter((workout) => workout.complete !== false);
    const lines = [
      "# Gym Tracker Export for AI Analysis",
      `Exported at: ${new Date().toISOString()}`,
      `Workout count: ${normalized.length}`,
      `Completed workouts: ${completed.length}`,
      `Average energy: ${averageRating(completed, "energy")}`,
      `Average area 1 discomfort: ${averageRating(completed, "areaOneDiscomfort")}`,
      `Average area 2 discomfort: ${averageRating(completed, "areaTwoDiscomfort")}`,
      "",
      "Use this data to analyze trends, consistency, progression, recovery, and exercise performance. Treat notes as user-entered local context.",
      ""
    ];

    normalized.forEach((workout, index) => {
      lines.push(workoutAiText(workout, index + 1));
      lines.push("");
    });

    return lines.join("\n").trim() + "\n";
  }

  function downloadText(filename, content, type = "text/plain") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportWorkoutForAi(workoutId) {
    const workout = findHistoryWorkout(workoutId);
    if (!workout) {
      showToast("Workout not found.");
      return;
    }

    const normalized = normalizeLegacyActive(workout);
    downloadText(workoutFileName(normalized, "ai-export", "md"), historyAiText([normalized]), "text/markdown");
    showToast("Workout AI export downloaded.");
  }

  function exportHistoryForAi() {
    const history = getHistory();
    if (!history.length) {
      showToast("No history to export.");
      return;
    }

    downloadText(`gym-tracker-history-ai-export-${today()}.md`, historyAiText(history), "text/markdown");
    showToast("History AI export downloaded.");
  }

  function printableWorkoutHtml(workout, index = 0) {
    const normalized = normalizeLegacyActive(workout);
    const imageSrc = index % 2 === 0 ? "./assets/images/dumbbells-closeup.png" : "./assets/images/gym-equipment.png";

    return `
      <section class="workout">
        <header class="workout-header">
          <div>
            <h2>${escapeHtml(normalized.name)}</h2>
            <p>${escapeHtml(normalized.date || "-")} · ${normalized.complete ? "Complete" : "In progress"}</p>
          </div>
          <img src="${imageSrc}" alt="" aria-hidden="true">
        </header>
        <dl>
          <div><dt>Recovery</dt><dd>${escapeHtml(normalized.recoveryStatus || "-")}</dd></div>
          <div><dt>Energy</dt><dd>${escapeHtml(formatRating(normalized, "energy"))}</dd></div>
          <div><dt>Area 1</dt><dd>${escapeHtml(formatRating(normalized, "areaOneDiscomfort"))}</dd></div>
          <div><dt>Area 2</dt><dd>${escapeHtml(formatRating(normalized, "areaTwoDiscomfort"))}</dd></div>
          <div><dt>Soreness</dt><dd>${escapeHtml(formatRating(normalized, "sorenessBefore"))}</dd></div>
        </dl>
        <table>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Discomfort</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${normalized.exercises.map((exercise) => `
              <tr>
                <td>${escapeHtml(exercise.name)}</td>
                <td>${escapeHtml(formatSetsWithStatus(exercise))}</td>
                <td>${escapeHtml(exercise.painStatus || "-")}</td>
                <td>${escapeHtml(exercise.notes || "-")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        ${normalized.notes ? `<p class="session-notes"><strong>Session notes:</strong> ${escapeHtml(normalized.notes)}</p>` : ""}
      </section>
    `;
  }

  function printableReportHtml(workouts, title) {
    const normalized = workouts.map(normalizeLegacyActive);
    const completed = normalized.filter((workout) => workout.complete !== false);

    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${escapeHtml(title)}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              margin: 0;
              color: #f7f7f8;
              font: 14px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              background:
                radial-gradient(circle at 12% 0%, rgba(207, 38, 50, .36), transparent 300px),
                radial-gradient(circle at 88% 16%, rgba(220, 239, 255, .10), transparent 260px),
                linear-gradient(145deg, rgba(255,255,255,.035) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.035) 50%, rgba(255,255,255,.035) 75%, transparent 75%, transparent),
                #050505;
              background-size: auto, auto, 18px 18px, auto;
            }
            main { max-width: 960px; margin: 0 auto; padding: 32px 20px; }
            .toolbar { display: flex; justify-content: space-between; gap: 12px; align-items: center; margin-bottom: 18px; }
            button { border: 0; border-radius: 8px; padding: 10px 14px; color: white; background: linear-gradient(180deg, #d12a35, #9a121b); font-weight: 800; }
            .cover, .workout {
              overflow: hidden;
              margin-bottom: 18px;
              padding: 24px;
              border: 1px solid rgba(255,255,255,.12);
              border-radius: 14px;
              background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025)), rgba(20,20,22,.94);
              box-shadow: 0 18px 46px rgba(0,0,0,.46);
            }
            .cover {
              min-height: 340px;
              display: grid;
              align-content: end;
              position: relative;
              border-color: rgba(255, 53, 68, .28);
            }
            .cover::before {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 0;
              background:
                linear-gradient(90deg, rgba(0,0,0,.88), rgba(0,0,0,.28)),
                url("./assets/images/tiger-gym-buddy.png") center / cover no-repeat,
                linear-gradient(135deg, #151515, #5e0f15);
              opacity: .92;
            }
            .cover > * { position: relative; z-index: 1; }
            .section-kicker {
              margin: 0 0 8px;
              color: #ff3a45;
              font-size: 12px;
              font-weight: 900;
              letter-spacing: .1em;
              text-transform: uppercase;
            }
            h1, h2 { margin: 0 0 8px; }
            h1 { max-width: 680px; font-size: clamp(34px, 8vw, 64px); line-height: .95; }
            h2 { color: #fff; }
            p { margin: 0 0 12px; }
            dl { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 16px 0; }
            dl div { padding: 10px; border: 1px solid rgba(255,255,255,.09); border-radius: 10px; background: rgba(0,0,0,.42); }
            dt { color: #b9c4cf; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
            dd { margin: 4px 0 0; font-weight: 800; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th, td { padding: 10px; border-bottom: 1px solid rgba(255,255,255,.10); text-align: left; vertical-align: top; }
            th { color: #b9c4cf; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }
            .workout-header {
              display: grid;
              grid-template-columns: 1fr 180px;
              gap: 16px;
              align-items: stretch;
              margin: -24px -24px 18px;
              padding: 18px 24px;
              background: linear-gradient(90deg, rgba(0,0,0,.72), rgba(181,22,31,.20));
            }
            .workout-header img {
              width: 100%;
              height: 112px;
              object-fit: cover;
              border-radius: 10px;
              border: 1px solid rgba(255,255,255,.14);
            }
            .session-notes { margin-top: 14px; padding: 12px; border-radius: 10px; color: #271b00; background: #f0a733; }
            @media print {
              body { color: #111; background: white; }
              main { max-width: none; padding: 0; }
              .toolbar { display: none; }
              .cover, .workout { break-inside: avoid; color: #111; box-shadow: none; border-radius: 0; }
              h2 { color: #111; }
              dl div { color: #111; background: #f3f4f6; border-color: #ddd; }
              dt, th { color: #555; }
              th, td { border-bottom-color: #ddd; }
            }
            @media (max-width: 700px) {
              dl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .workout-header { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <main>
            <div class="toolbar">
              <strong>${escapeHtml(title)}</strong>
              <button type="button" onclick="window.print()">Print / Save PDF</button>
            </div>
            <section class="cover">
              <p class="section-kicker">Gym Tracker Report</p>
              <h1>${escapeHtml(title)}</h1>
              <p>Generated ${escapeHtml(new Date().toLocaleString())}</p>
              <dl>
                <div><dt>Workouts</dt><dd>${normalized.length}</dd></div>
                <div><dt>Completed</dt><dd>${completed.length}</dd></div>
                <div><dt>Avg Energy</dt><dd>${escapeHtml(averageRating(completed, "energy"))}</dd></div>
                <div><dt>Avg Area 1</dt><dd>${escapeHtml(averageRating(completed, "areaOneDiscomfort"))}</dd></div>
                <div><dt>Avg Area 2</dt><dd>${escapeHtml(averageRating(completed, "areaTwoDiscomfort"))}</dd></div>
              </dl>
            </section>
            ${normalized.map((workout, index) => printableWorkoutHtml(workout, index)).join("")}
          </main>
        </body>
      </html>`;
  }

  function openPrintableReport(workouts, title, fallbackName) {
    if (!workouts.length) {
      showToast("No history to export.");
      return;
    }

    const html = printableReportHtml(workouts, title);
    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
      downloadText(fallbackName, html, "text/html");
      showToast("Popup blocked. Report HTML downloaded.");
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(html);
    reportWindow.document.close();
    reportWindow.focus();
    showToast("Report opened. Use Print to save PDF.");
  }

  function printWorkoutReport(workoutId) {
    const workout = findHistoryWorkout(workoutId);
    if (!workout) {
      showToast("Workout not found.");
      return;
    }

    const normalized = normalizeLegacyActive(workout);
    openPrintableReport([normalized], normalized.name, workoutFileName(normalized, "report", "html"));
  }

  function printHistoryReport() {
    const history = getHistory();
    openPrintableReport(history, "Workout History Report", `gym-tracker-history-report-${today()}.html`);
  }

  function exportLocalData() {
    const exportData = {
      app: "gym-tracker",
      version: 1,
      exportedAt: new Date().toISOString(),
      data: {
        activeWorkout: store.read(store.keys.activeWorkout, null),
        history: getHistory(),
        weights: getWeights(),
        appName: state.appName || defaultAppName,
        view: state.view,
        seeded: store.read(store.keys.seeded, false)
      }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gym-tracker-export-${today()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("Local data exported.");
  }

  function chooseImportFile() {
    document.getElementById("import-data-file")?.click();
  }

  function readFileAsText(file) {
    if (file.text) return file.text();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  function parseImportedData(payload) {
    const parsed = JSON.parse(payload);
    const data = parsed?.data || parsed;

    if (!data || typeof data !== "object") {
      throw new Error("Import file does not contain app data.");
    }

    return {
      activeWorkout: data.activeWorkout || null,
      history: Array.isArray(data.history) ? data.history : [],
      weights: Array.isArray(data.weights) ? data.weights : [],
      appName: typeof data.appName === "string" && data.appName.trim() ? data.appName.trim() : defaultAppName,
      view: typeof data.view === "string" ? data.view : "dashboard",
      seeded: data.seeded !== false
    };
  }

  async function importLocalData(input) {
    const file = input.files?.[0];
    if (!file) return;

    try {
      const imported = parseImportedData(await readFileAsText(file));
      saveHistory(imported.history);
      saveWeights(imported.weights);
      store.write(store.keys.appName, imported.appName);
      store.write(store.keys.seeded, imported.seeded);
      store.write(store.keys.view, imported.view);

      if (imported.activeWorkout) {
        state.active = normalizeLegacyActive(imported.activeWorkout);
        store.write(store.keys.activeWorkout, state.active);
      } else {
        store.remove(store.keys.activeWorkout);
        state.active = getActiveWorkout();
      }

      state.appName = imported.appName;
      applyAppName();
      showToast("Local data imported.");
      setView(views[imported.view] ? imported.view : "dashboard");
    } catch (error) {
      console.warn("Import failed", error);
      showToast("Import failed. Check the export file.");
    } finally {
      input.value = "";
    }
  }

  function startTimer(seconds) {
    state.timerRemaining = seconds;
    clearInterval(state.timerHandle);
    updateTimerDisplay();
    state.timerHandle = setInterval(() => {
      state.timerRemaining = Math.max(0, state.timerRemaining - 1);
      updateTimerDisplay();
      if (state.timerRemaining === 0) {
        clearInterval(state.timerHandle);
        if (navigator.vibrate) navigator.vibrate([180, 90, 180]);
        showToast("Rest finished.");
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerHandle);
    showToast("Timer stopped.");
  }

  function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateTimerDisplay() {
    const display = document.getElementById("timer-display");
    if (display) display.textContent = formatTime(state.timerRemaining);
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    if (target.dataset.view) setView(target.dataset.view);
    if (target.dataset.go) setView(target.dataset.go);
    if (target.dataset.startTemplate) startWorkout(target.dataset.startTemplate);
    if (target.dataset.editHistory) editSavedWorkout(target.dataset.editHistory);
    if (target.dataset.toggleSet !== undefined) toggleSet(target);
    if (target.dataset.addSet !== undefined) addSet(target);
    if (target.dataset.removeSet !== undefined) removeSet(target);
    if (target.dataset.finishWorkout !== undefined) finishWorkout();
    if (target.dataset.cancelEdit !== undefined) cancelWorkoutEdit();
    if (target.dataset.resetActive !== undefined) resetActiveWorkout();
    if (target.dataset.saveWeight !== undefined) saveWeight();
    if (target.dataset.saveAppName !== undefined) saveAppName();
    if (target.dataset.exportData !== undefined) exportLocalData();
    if (target.dataset.importData !== undefined) chooseImportFile();
    if (target.dataset.exportHistoryAi !== undefined) exportHistoryForAi();
    if (target.dataset.exportWorkoutAi) exportWorkoutForAi(target.dataset.exportWorkoutAi);
    if (target.dataset.printHistory !== undefined) printHistoryReport();
    if (target.dataset.printWorkout) printWorkoutReport(target.dataset.printWorkout);
    if (target.dataset.timer) startTimer(Number(target.dataset.timer));
    if (target.dataset.timerStop !== undefined) stopTimer();
  });

  document.addEventListener("change", (event) => {
    if (event.target.dataset.setField) updateSet(event.target);
    if (event.target.dataset.exerciseField) updateExerciseField(event.target);
    if (event.target.dataset.ratingField) updateRating(event.target);
    if (event.target.dataset.importFile !== undefined) importLocalData(event.target);
  });

  document.addEventListener("input", (event) => {
    if (event.target.dataset.workoutNotes !== undefined) {
      state.active.notes = event.target.value;
      saveActive();
    }
    if (event.target.dataset.setField) updateSet(event.target);
    if (event.target.dataset.appName !== undefined) {
      state.appName = event.target.value;
      applyAppName();
    }
    if (event.target.dataset.exerciseField) updateExerciseField(event.target);
    if (event.target.dataset.ratingField) updateRating(event.target);
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then((registration) => {
          registration.update();
        })
        .catch((error) => {
          console.warn("Service worker registration failed", error);
        });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (sessionStorage.getItem("gym-tracker-sw-refresh") === "done") return;
      sessionStorage.setItem("gym-tracker-sw-refresh", "done");
      window.location.reload();
    });
  }

  seedSampleData().then(() => {
    state.active = normalizeLegacyActive(getActiveWorkout());
    saveActive();
    applyAppName();
    setView(state.view);
  });
})();
