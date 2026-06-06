(function () {
  const prefix = "gym-tracker:";
  const legacyPrefix = atob("ZGFtaWFuLWd5bS10cmFja2VyOg==");

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(prefix + key);
      if (raw) return JSON.parse(raw);

      const legacyRaw = localStorage.getItem(legacyPrefix + key);
      if (!legacyRaw) return fallback;

      localStorage.setItem(prefix + key, legacyRaw);
      return JSON.parse(legacyRaw);
    } catch (error) {
      console.warn("Unable to read local data", error);
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(prefix + key, JSON.stringify(value));
    return value;
  }

  function remove(key) {
    localStorage.removeItem(prefix + key);
    localStorage.removeItem(legacyPrefix + key);
  }

  window.GymStore = {
    read,
    write,
    remove,
    keys: {
      activeWorkout: "active-workout",
      history: "history",
      weights: "weights",
      seeded: "sample-data-seeded",
      view: "current-view",
      appName: "app-name"
    }
  };
})();
