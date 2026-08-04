const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 12) {
    header.style.boxShadow = "0 10px 32px rgba(23, 50, 77, 0.08)";
  } else {
    header.style.boxShadow = "none";
  }
});

const platformScenarios = {
  tiktok: {
    name: "TikTok",
    moment: "Short-video feed",
    media: "Video Preview",
    avatar: "T",
    creator: "@quickupdate",
    meta: "Trending clip · 1.2M views",
    text: "Everyone is saying this new rule starts tomorrow. Share this before it gets taken down.",
    action: "Share",
    idle: "Tap Share to see how PIGEON appears before reposting.",
    triggered: "Share action detected. PIGEON is asking for one quick check.",
    title: "PIGEON pause",
    subtitle: "A short check before sharing",
    question: "What source supports the main claim in this video?",
    signals: ["Source gap", "High urgency", "Context needed"],
  },
  facebook: {
    name: "Facebook",
    moment: "Community group post",
    media: "Community Post",
    avatar: "F",
    creator: "Neighborhood Updates",
    meta: "Shared in a local community group",
    text: "A friend warned that this product is unsafe. Please share to protect every family.",
    action: "Share to group",
    idle: "Use Share to group to simulate a community forwarding moment.",
    triggered: "Group share detected. PIGEON appears before the post enters a trusted circle.",
    title: "PIGEON group share check",
    subtitle: "Reduce panic before forwarding",
    question: "Is this warning backed by a named source or official notice?",
    signals: ["Trusted circle", "Fear language", "Needs verification"],
  },
  xiaohongshu: {
    name: "XiaoHongShu",
    moment: "Note detail page",
    media: "Xiaohongshu Note",
    avatar: "小",
    creator: "AI Watch Daily",
    meta: "Note detail · social share",
    text: "Breaking: viral image shows smoke over downtown after sudden explosion.",
    action: "Share note",
    idle: "Use Share note to simulate forwarding this post.",
    triggered: "Share action detected. PIGEON appears before reposting.",
    title: "PIGEON note check",
    subtitle: "Pause before forwarding",
    question: "What source confirms this breaking-news image is real?",
    signals: ["Missing source", "Urgent wording", "AI image risk"],
  },
  instagram: {
    name: "Instagram",
    moment: "Story reshare",
    media: "Story Preview",
    avatar: "I",
    creator: "@visualdigest",
    meta: "Story repost · edited image",
    text: "This image proves what really happened. Repost if you care.",
    action: "Repost story",
    idle: "Use Repost story to simulate a visual-content context check.",
    triggered: "Story repost detected. PIGEON appears before resharing.",
    title: "PIGEON story check",
    subtitle: "Check image context before reposting",
    question: "Is the image source, edit history, or AI use disclosed?",
    signals: ["Visual context", "Emotional pressure", "AI disclosure"],
  },
};

const platformTabs = document.querySelectorAll(".platform-tab");
const perspectiveTabs = document.querySelectorAll(".perspective-tab");
const simulationSection = document.querySelector(".simulation-section");
const platformName = document.querySelector("#platformName");
const platformMoment = document.querySelector("#platformMoment");
const contentMedia = document.querySelector("#contentMediaLabel");
const overlayTitle = document.querySelector("#overlayTitle");
const overlaySubtitle = document.querySelector("#overlaySubtitle");
const reflectionQuestion = document.querySelector("#reflectionQuestion");
const signalOne = document.querySelector("#signalOne");
const signalTwo = document.querySelector("#signalTwo");
const signalThree = document.querySelector("#signalThree");
const simulationStage = document.querySelector(".simulation-stage");
const pigeonOverlay = document.querySelector("#pigeonOverlay");
const pigeonGradePopout = document.querySelector("#pigeonGradePopout");
const pigeonDrawerClose = document.querySelector("#pigeonDrawerClose");
const triggerPigeon = document.querySelector("#triggerPigeon");
const inlineShareTriggers = document.querySelectorAll(".inline-share-trigger");
const actionStatus = document.querySelector("#actionStatus");
const resolutionButtons = document.querySelectorAll(".resolution-button");
const publishTrigger = document.querySelector("#publishTrigger");
const creatorPigeon = document.querySelector("#creatorPigeon");
const creatorSourceAction = document.querySelector("#creatorSourceAction");
const creatorAiAction = document.querySelector("#creatorAiAction");
const creatorToneAction = document.querySelector("#creatorToneAction");
const creatorReadiness = document.querySelector("#creatorReadiness");
const creatorProgress = document.querySelector("#creatorProgress");
const creatorMeter = document.querySelector("#creatorMeter");
const sourceIssue = document.querySelector("#sourceIssue");
const aiIssue = document.querySelector("#aiIssue");
const urgencyIssue = document.querySelector("#urgencyIssue");
const aiMediaMark = document.querySelector("#aiMediaMark");
const creatorCopy = document.querySelector("#creatorCopy");
const creatorTierStatus = document.querySelector("#creatorTierStatus");
const creatorTierStages = document.querySelectorAll(".creator-tier-stage");

let activePlatform = "tiktok";

function setPerspective(perspective) {
  simulationSection.dataset.perspective = perspective;
  perspectiveTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.perspective === perspective);
    tab.setAttribute("aria-selected", String(tab.dataset.perspective === perspective));
  });
  pigeonOverlay.classList.add("hidden");
  creatorPigeon.classList.toggle("hidden", perspective !== "creator");
}

function setPlatform(platformKey) {
  const scenario = platformScenarios[platformKey];
  if (!scenario) return;
  activePlatform = platformKey;

  platformTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.platform === platformKey);
  });

  simulationStage.dataset.platformView = platformKey;
  platformName.textContent = scenario.name;
  platformMoment.textContent = scenario.moment;
  contentMedia.textContent = scenario.media;
  overlayTitle.textContent = scenario.title;
  overlaySubtitle.textContent = scenario.subtitle;
  reflectionQuestion.textContent = scenario.question;
  triggerPigeon.textContent = scenario.action;
  actionStatus.textContent = scenario.idle;
  [signalOne, signalTwo, signalThree].forEach((signal, index) => {
    signal.textContent = scenario.signals[index];
  });
  pigeonOverlay.classList.add("hidden");
  pigeonOverlay.classList.add("compact");
  pigeonOverlay.classList.remove("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "false");
}

platformTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPlatform(tab.dataset.platform));
});

perspectiveTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPerspective(tab.dataset.perspective));
});

triggerPigeon.addEventListener("click", () => {
  const scenario = platformScenarios[activePlatform];
  pigeonOverlay.classList.remove("hidden");
  pigeonOverlay.classList.add("compact");
  pigeonOverlay.classList.remove("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "false");
  actionStatus.textContent = scenario.triggered;
});

pigeonGradePopout.addEventListener("click", () => {
  pigeonOverlay.classList.remove("compact");
  pigeonOverlay.classList.add("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "true");
});

pigeonDrawerClose.addEventListener("click", () => {
  pigeonOverlay.classList.add("hidden");
  pigeonOverlay.classList.add("compact");
  pigeonOverlay.classList.remove("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "false");
});

inlineShareTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    triggerPigeon.click();
  });
});

resolutionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choice = button.textContent.trim();
    actionStatus.textContent = `User chose: ${choice}.`;
    pigeonOverlay.classList.add("hidden");
    pigeonOverlay.classList.add("compact");
    pigeonOverlay.classList.remove("expanded");
    pigeonGradePopout.setAttribute("aria-expanded", "false");
  });
});

let creatorFixes = { source: false, ai: false, tone: false };

function updateCreatorStudio() {
  const count = Object.values(creatorFixes).filter(Boolean).length;
  const readiness = [10, 43, 72, 100][count];
  creatorProgress.textContent = `${readiness}%`;
  creatorMeter.style.width = `${readiness}%`;
  creatorReadiness.textContent = count === 3 ? "Ready to publish" : count === 2 ? "Almost ready" : "Needs context";
  creatorPigeon.classList.toggle("ready", count === 3);
  const tierNames = ["Level 1: Nest", "Level 2: Nest + Egg", "Level 3: Young Bird", "Level 4: Full Bird"];
  creatorTierStatus.textContent = tierNames[count];
  creatorTierStages.forEach((stage, index) => stage.classList.toggle("active", index === count));

  sourceIssue.textContent = creatorFixes.source ? "Source linked" : "No source cited";
  sourceIssue.classList.toggle("resolved", creatorFixes.source);
  aiIssue.textContent = creatorFixes.ai ? "AI media disclosed" : "AI disclosure missing";
  aiIssue.classList.toggle("resolved", creatorFixes.ai);
  urgencyIssue.textContent = creatorFixes.tone ? "Tone balanced" : "High urgency language";
  urgencyIssue.classList.toggle("resolved", creatorFixes.tone);
  aiMediaMark.classList.toggle("hidden", !creatorFixes.ai);
  creatorCopy.classList.toggle("tone-balanced", creatorFixes.tone);

  [[creatorSourceAction, creatorFixes.source, "Source citation attached", "Add primary source link", "Done", "+ Source"], [creatorAiAction, creatorFixes.ai, "AI media disclosed", "Mark AI media usage", "Done", "+ Tag"], [creatorToneAction, creatorFixes.tone, "Tone balanced", "Soften emotional urgency", "Done", "Auto-fix"]].forEach(([button, isDone, doneText, idleText, doneTag, idleTag]) => {
    button.classList.toggle("resolved", isDone);
    button.querySelector("span:nth-child(2)").textContent = isDone ? doneText : idleText;
    button.querySelector("em").textContent = isDone ? doneTag : idleTag;
  });
}

creatorSourceAction.addEventListener("click", () => { creatorFixes.source = !creatorFixes.source; updateCreatorStudio(); });
creatorAiAction.addEventListener("click", () => { creatorFixes.ai = !creatorFixes.ai; updateCreatorStudio(); });
creatorToneAction.addEventListener("click", () => { creatorFixes.tone = !creatorFixes.tone; updateCreatorStudio(); });

publishTrigger.addEventListener("click", () => {
  if (Object.values(creatorFixes).every(Boolean)) {
    creatorReadiness.textContent = "Published with context";
  } else {
    creatorPigeon.classList.add("needs-attention");
    setTimeout(() => creatorPigeon.classList.remove("needs-attention"), 500);
  }
});

updateCreatorStudio();

setPlatform("tiktok");
setPerspective("viewer");
