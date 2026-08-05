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
    action: "Share",
    triggered: "Share action detected. PIGEON is asking for one quick check.",
    title: "PIGEON pause",
    subtitle: "A short check before sharing",
    examples: [
      {
        grade: "b",
        moment: "Short-video feed",
        media: "Video Preview",
        creator: "@citybrief",
        meta: "♪ Original sound · local update",
        text: "The city posted new weekend transit changes. Check the official notice before you share.",
        idle: "Tap Share to see a low-friction B-grade transparency check.",
        question: "The claim points to an official source. Do you want to keep that context attached?",
        signals: ["Named source", "Calm wording", "Context present"],
        summary: "Official source mentioned",
        notice: "Notice: Source is visible, but context should stay attached.",
      },
      {
        grade: "c",
        moment: "Short-video feed",
        media: "Video Preview",
        creator: "@quickupdate",
        meta: "♪ Original sound · trending update",
        text: "Everyone is saying this new rule starts tomorrow. Share this before it gets taken down.",
        idle: "Tap Share to see a C-grade source-gap warning.",
        question: "What source supports the main claim in this video?",
        signals: ["Source gap", "High urgency", "Context needed"],
        summary: "No official source found",
        notice: "Notice: No official news source found.",
      },
      {
        grade: "d",
        moment: "Short-video feed",
        media: "Video Preview",
        creator: "@alertwire",
        meta: "♪ Reused audio · viral clip",
        text: "Emergency warning: schools are closing tomorrow. Forward this now before the announcement is deleted.",
        idle: "Tap Share to see a stronger D-grade intervention.",
        question: "This post makes an urgent public-safety claim without a source. Should it be shared as-is?",
        signals: ["No source", "Public safety", "Extreme urgency"],
        summary: "High-risk unsourced claim",
        notice: "Notice: Urgent public-safety claim without a verifiable source.",
      },
    ],
  },
  facebook: {
    name: "Facebook",
    action: "Share to group",
    triggered: "Group share detected. PIGEON appears before the post enters a trusted circle.",
    title: "PIGEON group share check",
    subtitle: "Reduce panic before forwarding",
    examples: [
      {
        grade: "b",
        moment: "Community group post",
        media: "Community Post",
        creator: "Town Library Updates",
        meta: "Public page · 18 min",
        text: "The library shared a schedule change for tomorrow's event and linked the updated city calendar.",
        idle: "Use Share to group to simulate a B-grade community forwarding moment.",
        question: "This post includes a named institution. Do you want to preserve the source when sharing?",
        signals: ["Named source", "Low urgency", "Context present"],
        summary: "Source is traceable",
        notice: "Notice: Source is visible. Sharing with context keeps the post clear.",
      },
      {
        grade: "c",
        moment: "Community group post",
        media: "Community Post",
        creator: "Neighborhood Updates",
        meta: "Shared in a local community group",
        text: "A friend warned that this product is unsafe. Please share to protect every family.",
        idle: "Use Share to group to simulate a C-grade community warning.",
        question: "Is this warning backed by a named source or official notice?",
        signals: ["Trusted circle", "Fear language", "Needs verification"],
        summary: "Source not named",
        notice: "Notice: No official notice or named source found.",
      },
      {
        grade: "d",
        moment: "Community group post",
        media: "Community Post",
        creator: "Parents Safety Alert",
        meta: "Forwarded many times · group post",
        text: "Police are hiding reports about strangers near schools. Share this to every parent immediately.",
        idle: "Use Share to group to simulate a D-grade panic-forwarding risk.",
        question: "This claim names a serious safety threat without evidence. Do you still want to forward it?",
        signals: ["No evidence", "Fear appeal", "Trusted circle"],
        summary: "High-risk fear claim",
        notice: "Notice: Serious safety claim without a named source or official report.",
      },
    ],
  },
  xiaohongshu: {
    name: "XiaoHongShu",
    action: "Share note",
    triggered: "Share action detected. PIGEON appears before reposting.",
    title: "PIGEON note check",
    subtitle: "Pause before forwarding",
    examples: [
      {
        grade: "b",
        moment: "Note detail page",
        media: "Xiaohongshu Note",
        creator: "Media Literacy Lab",
        meta: "Note detail · source included",
        text: "AI image detectors can make mistakes. This post links to the original image and explains what was edited.",
        body: "The creator discloses the image source, edit steps, and why a detector result should not be treated as final proof.",
        idle: "Use Share note to simulate a B-grade post with visible context.",
        question: "This note includes source and edit context. Do you want to share with that context visible?",
        signals: ["Source linked", "Edit context", "Low urgency"],
        summary: "Context is disclosed",
        notice: "Notice: Context is present. Keep it attached if you share.",
      },
      {
        grade: "c",
        moment: "Note detail page",
        media: "Xiaohongshu Note",
        creator: "AI Watch Daily",
        meta: "Note detail · social share",
        text: "Breaking: viral image shows smoke over downtown after sudden explosion",
        body: "Just saw this everywhere. People nearby say roads are blocked and emergency teams are arriving. Share this so others know what is happening before it gets removed.",
        idle: "Use Share note to simulate a C-grade breaking-news image risk.",
        question: "What source confirms this breaking-news image is real?",
        signals: ["Missing source", "Urgent wording", "AI image risk"],
        summary: "Image source unclear",
        notice: "Notice: Breaking-news image has no visible source.",
      },
      {
        grade: "d",
        moment: "Note detail page",
        media: "Xiaohongshu Note",
        creator: "Viral Proof",
        meta: "Note detail · reposted image",
        text: "Leaked AI-generated photo proves the incident was staged",
        body: "The image is being reposted as proof, but no original source, location, timestamp, or AI disclosure is shown.",
        idle: "Use Share note to simulate a D-grade synthetic-image claim.",
        question: "This post treats an unverified image as proof. Should it be shared without context?",
        signals: ["Synthetic risk", "No origin", "Proof claim"],
        summary: "High-risk image claim",
        notice: "Notice: Unverified image is presented as proof without origin details.",
      },
    ],
  },
  instagram: {
    name: "Instagram",
    action: "Repost story",
    triggered: "Story repost detected. PIGEON appears before resharing.",
    title: "PIGEON story check",
    subtitle: "Check image context before reposting",
    examples: [
      {
        grade: "b",
        moment: "Story reshare",
        media: "Story Preview",
        creator: "@newsroom",
        meta: "Story repost · source tagged",
        text: "Updated timeline from the newsroom. Original report and correction are linked.",
        caption: "Source and correction are visible before resharing.",
        idle: "Use Repost story to simulate a B-grade visual-content check.",
        question: "The story tags its source and correction. Do you want to keep that context attached?",
        signals: ["Source tagged", "Correction shown", "Low pressure"],
        summary: "Source context visible",
        notice: "Notice: Source and correction context are visible.",
      },
      {
        grade: "c",
        moment: "Story reshare",
        media: "Story Preview",
        creator: "@visualdigest",
        meta: "Story repost · edited image",
        text: "This image proves what really happened. Repost if you care.",
        caption: "Image context matters before resharing.",
        idle: "Use Repost story to simulate a C-grade visual-content context check.",
        question: "Is the image source, edit history, or AI use disclosed?",
        signals: ["Visual context", "Emotional pressure", "AI disclosure"],
        summary: "Edit context missing",
        notice: "Notice: Image source or edit history is not visible.",
      },
      {
        grade: "d",
        moment: "Story reshare",
        media: "Story Preview",
        creator: "@shockdaily",
        meta: "Story repost · viral screenshot",
        text: "They do not want you to see this screenshot. Repost before it disappears.",
        caption: "Viral screenshot has no traceable source.",
        idle: "Use Repost story to simulate a D-grade screenshot rumor.",
        question: "This screenshot makes a serious claim without traceable origin. Continue sharing?",
        signals: ["No origin", "Manipulation risk", "High pressure"],
        summary: "High-risk screenshot",
        notice: "Notice: Viral screenshot has no traceable origin or verification.",
      },
    ],
  },
};

const platformTabs = document.querySelectorAll(".platform-tab");
const perspectiveTabs = document.querySelectorAll(".perspective-tab");
const simulationSection = document.querySelector(".simulation-section");
const platformName = document.querySelector("#platformName");
const platformMoment = document.querySelector("#platformMoment");
const contentMedia = document.querySelector("#contentMediaLabel");
const tiktokCreator = document.querySelector("#tiktokCreator");
const tiktokText = document.querySelector("#tiktokText");
const tiktokMeta = document.querySelector("#tiktokMeta");
const facebookCreator = document.querySelector("#facebookCreator");
const facebookMeta = document.querySelector("#facebookMeta");
const facebookText = document.querySelector("#facebookText");
const facebookMedia = document.querySelector("#facebookMedia");
const instagramCreator = document.querySelector("#instagramCreator");
const instagramMeta = document.querySelector("#instagramMeta");
const instagramMedia = document.querySelector("#instagramMedia");
const instagramText = document.querySelector("#instagramText");
const instagramCaptionCreator = document.querySelector("#instagramCaptionCreator");
const instagramCaptionText = document.querySelector("#instagramCaptionText");
const xhsCreator = document.querySelector("#xhsCreator");
const xhsTitle = document.querySelector("#xhsTitle");
const xhsText = document.querySelector("#xhsText");
const overlayTitle = document.querySelector("#overlayTitle");
const overlaySubtitle = document.querySelector("#overlaySubtitle");
const popoutGradeText = document.querySelector("#popoutGradeText");
const popoutGradeSummary = document.querySelector("#popoutGradeSummary");
const miniGrade = document.querySelector(".mini-grade");
const gradeLetters = document.querySelectorAll("[data-grade-letter]");
const reflectionQuestion = document.querySelector("#reflectionQuestion");
const signalOne = document.querySelector("#signalOne");
const signalTwo = document.querySelector("#signalTwo");
const signalThree = document.querySelector("#signalThree");
const reflectionNotice = document.querySelector(".reflection-card strong");
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
let activeScenario = platformScenarios.tiktok.examples[1];
let pigeonPopoutTimer;

function pickScenario(platformKey) {
  const examples = platformScenarios[platformKey]?.examples || [];
  return examples[Math.floor(Math.random() * examples.length)];
}

function updateGradeDisplay(grade) {
  const normalizedGrade = grade.toLowerCase();
  pigeonOverlay.dataset.grade = normalizedGrade;
  miniGrade.textContent = normalizedGrade.toUpperCase();
  popoutGradeText.textContent = `Info-Grade ${normalizedGrade.toUpperCase()}`;
  gradeLetters.forEach((letter) => {
    letter.classList.toggle("active", letter.dataset.gradeLetter === normalizedGrade);
  });
}

function updatePlatformContent(platformKey, scenario) {
  if (platformKey === "tiktok") {
    tiktokCreator.textContent = scenario.creator;
    tiktokText.textContent = scenario.text;
    tiktokMeta.textContent = scenario.meta;
  }

  if (platformKey === "facebook") {
    facebookCreator.textContent = scenario.creator;
    facebookMeta.textContent = scenario.meta;
    facebookText.textContent = scenario.text;
    facebookMedia.textContent = scenario.media;
  }

  if (platformKey === "instagram") {
    instagramCreator.textContent = scenario.creator;
    instagramCaptionCreator.textContent = scenario.creator;
    instagramMeta.textContent = scenario.meta;
    instagramMedia.textContent = scenario.media;
    instagramText.textContent = scenario.text;
    instagramCaptionText.textContent = scenario.caption;
  }

  if (platformKey === "xiaohongshu") {
    xhsCreator.textContent = scenario.creator;
    xhsTitle.textContent = scenario.text;
    xhsText.textContent = scenario.body;
  }
}

function hidePigeonPopout() {
  clearTimeout(pigeonPopoutTimer);
  pigeonOverlay.classList.add("hidden");
  pigeonOverlay.classList.add("compact");
  pigeonOverlay.classList.remove("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "false");
}

function showPigeonPopout() {
  clearTimeout(pigeonPopoutTimer);
  pigeonOverlay.classList.remove("hidden");
  pigeonOverlay.classList.add("compact");
  pigeonOverlay.classList.remove("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "false");
  pigeonPopoutTimer = setTimeout(hidePigeonPopout, 15000);
}

function setPerspective(perspective) {
  simulationSection.dataset.perspective = perspective;
  perspectiveTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.perspective === perspective);
    tab.setAttribute("aria-selected", String(tab.dataset.perspective === perspective));
  });
  hidePigeonPopout();
  creatorPigeon.classList.toggle("hidden", perspective !== "creator");
}

function setPlatform(platformKey) {
  const platform = platformScenarios[platformKey];
  const scenario = pickScenario(platformKey);
  if (!platform || !scenario) return;
  activePlatform = platformKey;
  activeScenario = scenario;

  platformTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.platform === platformKey);
  });

  simulationStage.dataset.platformView = platformKey;
  platformName.textContent = platform.name;
  platformMoment.textContent = scenario.moment;
  contentMedia.textContent = scenario.media;
  overlayTitle.textContent = platform.title;
  overlaySubtitle.textContent = platform.subtitle;
  popoutGradeSummary.textContent = scenario.summary;
  reflectionNotice.textContent = scenario.notice;
  reflectionQuestion.textContent = scenario.question;
  triggerPigeon.textContent = platform.action;
  actionStatus.textContent = scenario.idle;
  updateGradeDisplay(scenario.grade);
  updatePlatformContent(platformKey, scenario);
  [signalOne, signalTwo, signalThree].forEach((signal, index) => {
    signal.textContent = scenario.signals[index];
  });
  hidePigeonPopout();
}

platformTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPlatform(tab.dataset.platform));
});

perspectiveTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPerspective(tab.dataset.perspective));
});

triggerPigeon.addEventListener("click", () => {
  const scenario = platformScenarios[activePlatform];
  showPigeonPopout();
  actionStatus.textContent = scenario.triggered;
});

pigeonGradePopout.addEventListener("click", () => {
  clearTimeout(pigeonPopoutTimer);
  pigeonOverlay.classList.remove("compact");
  pigeonOverlay.classList.add("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "true");
});

pigeonDrawerClose.addEventListener("click", () => {
  hidePigeonPopout();
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
    hidePigeonPopout();
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
