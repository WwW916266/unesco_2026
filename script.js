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
const creatorEditor = document.querySelector(".creator-editor");
const creatorWorkspace = document.querySelector("#creatorWorkspace");
const creatorCaseGrid = document.querySelector("#creatorCaseGrid");
const typingStatus = document.querySelector("#typingStatus");
const previewMediaLabel = document.querySelector("#previewMediaLabel");
const creatorHandle = document.querySelector("#creatorHandle");
const creatorHandleText = document.querySelector("#creatorHandleText");
const creatorMeta = document.querySelector("#creatorMeta");
const uploadCaseGrid = document.querySelector("#uploadCaseGrid");
const creatorUploadPanel = document.querySelector(".creator-upload-panel");
const imageAnalysis = document.querySelector("#imageAnalysis");
const imageAnalysisGrade = document.querySelector("#imageAnalysisGrade");
const imageAnalysisTitle = document.querySelector("#imageAnalysisTitle");
const imageAnalysisText = document.querySelector("#imageAnalysisText");
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

const creatorDraftCases = [
  {
    title: "Breaking image",
    handle: "@citysignal",
    meta: "Breaking visual update · public post",
    media: "AI image preview",
    draft: "Huge update: this AI image proves the downtown explosion happened today. Everyone should share it before it disappears.",
    segments: [
      { text: "Huge update:", className: "urgency-flag" },
      { text: "this AI image proves", className: "share-flag" },
      { text: "the downtown explosion happened today. Everyone should share it before it disappears.", className: "" },
    ],
    fixes: { source: false, ai: false, tone: false },
    progressLabel: "Needs context",
    tierIndex: 0,
    imageCaseIndex: 0,
    analysisTitle: "Source, tone, and AI disclosure all need work",
    analysisBody: "PIGEON flags this as a high-pressure claim with no source attached and synthetic media risk.",
    uploadPrompt: "Try a preset photo check after the draft is analyzed.",
  },
  {
    title: "Health claim",
    handle: "@healthwatch",
    meta: "Wellness post · social share",
    media: "Static image preview",
    draft: "This daily supplement reverses fatigue in one week. My friend fixed everything after one post.",
    segments: [
      { text: "This daily supplement", className: "urgency-flag" },
      { text: "reverses fatigue in one week.", className: "share-flag" },
      { text: "My friend fixed everything after one post.", className: "" },
    ],
    fixes: { source: false, ai: true, tone: false },
    progressLabel: "Partly disclosed",
    tierIndex: 1,
    imageCaseIndex: 2,
    analysisTitle: "Health claim needs a source and calmer language",
    analysisBody: "The post sounds confident but does not show a source or evidence for the claim.",
    uploadPrompt: "Upload a preset image next to see how PIGEON handles visual context.",
  },
  {
    title: "School alert",
    handle: "@parentcircle",
    meta: "Community warning · forward",
    media: "Forwarded screenshot",
    draft: "Schools are closing tomorrow morning. Forward this to every parent before the notice disappears.",
    segments: [
      { text: "Schools are closing tomorrow morning.", className: "urgency-flag" },
      { text: "Forward this to every parent", className: "share-flag" },
      { text: "before the notice disappears.", className: "" },
    ],
    fixes: { source: false, ai: false, tone: true },
    progressLabel: "Urgent claim",
    tierIndex: 1,
    imageCaseIndex: 1,
    analysisTitle: "Urgency is high and the source is missing",
    analysisBody: "PIGEON asks for the official notice first, then suggests reducing the pressure to forward it immediately.",
    uploadPrompt: "Then try a photo case to see a second type of check.",
  },
  {
    title: "Edited clip",
    handle: "@visualdesk",
    meta: "Short clip · edited media",
    media: "Video preview",
    draft: "This clip proves the event was staged. Look closely at the cut - that is all the proof you need.",
    segments: [
      { text: "This clip proves", className: "urgency-flag" },
      { text: "the event was staged.", className: "share-flag" },
      { text: "Look closely at the cut - that is all the proof you need.", className: "" },
    ],
    fixes: { source: true, ai: false, tone: false },
    progressLabel: "Source mentioned",
    tierIndex: 2,
    imageCaseIndex: 1,
    analysisTitle: "Edit history and AI disclosure still need attention",
    analysisBody: "A source is named, but the edit trail and synthetic media context are still incomplete.",
    uploadPrompt: "You can also simulate a photo upload once the text review is done.",
  },
  {
    title: "Product warning",
    handle: "@shopwatch",
    meta: "Consumer post · public group",
    media: "Post preview",
    draft: "Do not buy this bottle. The brand is hiding a recall and everyone should warn their friends now.",
    segments: [
      { text: "Do not buy this bottle.", className: "urgency-flag" },
      { text: "The brand is hiding a recall", className: "share-flag" },
      { text: "and everyone should warn their friends now.", className: "" },
    ],
    fixes: { source: false, ai: true, tone: false },
    progressLabel: "Warning mode",
    tierIndex: 2,
    imageCaseIndex: 0,
    analysisTitle: "Consumer warning needs a named recall source",
    analysisBody: "PIGEON sees a strong warning without a clear citation, so it stays in check mode until the source is added.",
    uploadPrompt: "Move on to a photo preset to finish the full flow.",
  },
];

const creatorImageCases = [
  {
    label: "AI news photo",
    grade: "c",
    title: "Source and AI disclosure needed",
    text: "The photo looks news-like, but origin, edit history, and AI disclosure are missing.",
  },
  {
    label: "Edited screenshot",
    grade: "d",
    title: "Screenshot needs a traceable origin",
    text: "This screenshot is being shared as proof, but no original post, date, or source is visible.",
  },
  {
    label: "Product image",
    grade: "b",
    title: "Product photo is mostly traceable",
    text: "The image includes a named seller and a visible product page, so PIGEON keeps the warning light.",
  },
];

let activePlatform = "tiktok";
let activeScenario = platformScenarios.tiktok.examples[1];
let pigeonPopoutTimer;
let creatorTypingTimer;
let creatorTypingPhaseTimer;
let creatorUploadReadyTimer;
let activeCreatorCaseIndex = 0;
let activeImageCaseIndex = 0;
let creatorFlowLocked = true;
let creatorCurrentDraft = creatorDraftCases[0];
let creatorPhase = "case";
let creatorTutorialDismissed = false;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function renderSegmentedDraft(caseData) {
  return caseData.segments
    .map((segment) => {
      const text = escapeHtml(segment.text);
      return segment.className ? `<span class="${segment.className}">${text}</span>` : text;
    })
    .join(" ");
}

function setCreatorActionsDisabled(disabled) {
  [creatorSourceAction, creatorAiAction, creatorToneAction, publishTrigger].forEach((button) => {
    if (button) button.disabled = disabled;
  });
}

function setCreatorPhase(phase) {
  creatorPhase = phase;
  if (creatorWorkspace) creatorWorkspace.dataset.phase = phase;
  document.querySelectorAll(".creator-flow-steps span").forEach((step) => {
    const stepName = step.dataset.flowStep;
    step.classList.toggle("active", stepName === phase);
    step.classList.toggle("done", ["type", "analyze", "upload"].includes(stepName) && ["analyze", "upload"].includes(phase) && stepName !== phase);
  });
}

function setCreatorUploadReady(ready) {
  creatorFlowLocked = !ready;
  creatorPigeon.classList.toggle("creator-ready", ready);
  creatorUploadPanel?.classList.toggle("active", ready);
  setCreatorActionsDisabled(!ready);
  if (ready && creatorPhase === "analyze") setCreatorPhase("upload");
}

function clearCreatorTimers() {
  clearTimeout(creatorTypingTimer);
  clearTimeout(creatorTypingPhaseTimer);
  clearTimeout(creatorUploadReadyTimer);
}

function updateCreatorCaseButtons(index) {
  creatorCaseGrid?.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.creatorCase) === index);
  });
}

function updateImageCaseButtons(index) {
  uploadCaseGrid?.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.imageCase) === index);
  });
}

function setCreatorTutorialVisible(isVisible) {
  const firstCaseButton = creatorCaseGrid?.querySelector("button[data-creator-case='0']");
  const shouldShow = Boolean(isVisible && !creatorTutorialDismissed && creatorFlowLocked);
  creatorEditor?.classList.toggle("tutorial-active", shouldShow);
  firstCaseButton?.classList.toggle("tutorial-target", shouldShow);
}

function dismissCreatorTutorial() {
  creatorTutorialDismissed = true;
  setCreatorTutorialVisible(false);
}

function updateCreatorAnalysis(caseData) {
  const { fixes } = caseData;
  const count = Object.values(fixes).filter(Boolean).length;
  const readiness = [10, 43, 72, 100][count];
  creatorProgress.textContent = `${readiness}%`;
  creatorMeter.style.width = `${readiness}%`;
  creatorReadiness.textContent = count === 3 ? "Ready to publish" : count === 2 ? "Almost ready" : caseData.progressLabel;
  creatorPigeon.classList.toggle("ready", count === 3);
  creatorTierStatus.textContent = ["Level 1: Nest", "Level 2: Nest + Egg", "Level 3: Young Bird", "Level 4: Full Bird"][caseData.tierIndex];
  creatorTierStages.forEach((stage, index) => stage.classList.toggle("active", index === caseData.tierIndex));
  sourceIssue.textContent = fixes.source ? "Source linked" : "No source cited";
  sourceIssue.classList.toggle("resolved", fixes.source);
  aiIssue.textContent = fixes.ai ? "AI media disclosed" : "AI disclosure missing";
  aiIssue.classList.toggle("resolved", fixes.ai);
  urgencyIssue.textContent = fixes.tone ? "Tone balanced" : "High urgency language";
  urgencyIssue.classList.toggle("resolved", fixes.tone);
  aiMediaMark.classList.toggle("hidden", !fixes.ai);
  creatorCopy.classList.toggle("tone-balanced", fixes.tone);
  creatorCopy.classList.add("is-highlighted");
  setCreatorPhase("analyze");

  [
    [creatorSourceAction, fixes.source, "Source citation attached", "Add primary source link", "Done", "+ Source"],
    [creatorAiAction, fixes.ai, "AI media disclosed", "Mark AI media usage", "Done", "+ Tag"],
    [creatorToneAction, fixes.tone, "Tone balanced", "Soften emotional urgency", "Done", "Auto-fix"],
  ].forEach(([button, isDone, doneText, idleText, doneTag, idleTag]) => {
    button.classList.toggle("resolved", isDone);
    button.querySelector("span:nth-child(2)").textContent = isDone ? doneText : idleText;
    button.querySelector("em").textContent = isDone ? doneTag : idleTag;
  });
}

function renderTypedDraft(caseData) {
  creatorCopy.innerHTML = renderSegmentedDraft(caseData);
}

function typeCreatorDraft(caseData) {
  clearCreatorTimers();
  creatorCurrentDraft = caseData;
  setCreatorPhase("type");
  typingStatus.textContent = "Typing draft...";
  creatorCopy.classList.remove("tone-balanced");
  creatorCopy.classList.remove("is-highlighted");
  creatorCopy.classList.add("is-typing");
  creatorCopy.textContent = "";
  previewMediaLabel.textContent = caseData.media;
  creatorHandleText.textContent = caseData.handle;
  creatorMeta.textContent = caseData.meta;
  imageAnalysis.classList.add("hidden");
  imageAnalysis.classList.remove("active");
  imageAnalysisGrade.textContent = "Image Grade C";
  imageAnalysisTitle.textContent = "Source and AI disclosure needed";
  imageAnalysisText.textContent = "PIGEON checks origin, edit history, and whether synthetic media is disclosed.";
  setCreatorUploadReady(false);

  const draft = caseData.draft;
  let index = 0;
  const step = () => {
    creatorCopy.textContent = draft.slice(0, index);
    index += 2;
    if (index <= draft.length) {
      creatorTypingTimer = setTimeout(step, 18);
    } else {
      creatorCopy.classList.remove("is-typing");
      renderTypedDraft(caseData);
      typingStatus.textContent = "Draft analyzed";
      creatorCopy.classList.add("is-highlighted");
      updateCreatorAnalysis(caseData);
      setCreatorUploadReady(true);
      creatorUploadReadyTimer = setTimeout(() => {
        typingStatus.textContent = caseData.uploadPrompt;
      }, 360);
      creatorTypingPhaseTimer = setTimeout(() => {
        setImageCase(caseData.imageCaseIndex);
      }, 620);
    }
  };
  step();
}

function setCreatorCase(index) {
  const caseData = creatorDraftCases[index];
  if (!caseData) return;
  activeCreatorCaseIndex = index;
  updateCreatorCaseButtons(index);
  creatorPigeon.classList.remove("needs-attention");
  setCreatorActionsDisabled(true);
  setCreatorPhase("case");
  creatorReadiness.textContent = "Typing...";
  creatorProgress.textContent = "0%";
  creatorMeter.style.width = "0%";
  creatorTierStatus.textContent = "Level 1: Nest";
  creatorTierStages.forEach((stage, stageIndex) => stage.classList.toggle("active", stageIndex === 0));
  sourceIssue.textContent = "Loading...";
  aiIssue.textContent = "Loading...";
  urgencyIssue.textContent = "Loading...";
  typingStatus.textContent = "Typing draft...";
  typeCreatorDraft(caseData);
}

function setImageCase(index) {
  const imageCase = creatorImageCases[index];
  if (!imageCase) return;
  activeImageCaseIndex = index;
  updateImageCaseButtons(index);
  setCreatorPhase("upload");
  imageAnalysis.classList.remove("hidden");
  imageAnalysis.classList.add("active");
  imageAnalysisGrade.textContent = `Image Grade ${imageCase.grade.toUpperCase()}`;
  imageAnalysisTitle.textContent = imageCase.title;
  imageAnalysisText.textContent = imageCase.text;
  previewMediaLabel.textContent = imageCase.label;
}

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
  pigeonOverlay.classList.remove("is-timing");
  pigeonOverlay.classList.remove("just-opened");
  pigeonOverlay.classList.add("hidden");
  pigeonOverlay.classList.add("compact");
  pigeonOverlay.classList.remove("expanded");
  pigeonGradePopout.setAttribute("aria-expanded", "false");
}

function showPigeonPopout() {
  clearTimeout(pigeonPopoutTimer);
  pigeonOverlay.classList.remove("is-timing");
  pigeonOverlay.classList.remove("hidden");
  pigeonOverlay.classList.add("compact");
  pigeonOverlay.classList.remove("expanded");
  pigeonOverlay.classList.add("just-opened");
  pigeonGradePopout.setAttribute("aria-expanded", "false");
  void pigeonOverlay.offsetWidth;
  pigeonOverlay.classList.add("is-timing");
  setTimeout(() => pigeonOverlay.classList.remove("just-opened"), 250);
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
  setCreatorTutorialVisible(perspective === "creator");
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
  if (pigeonOverlay.classList.contains("just-opened")) return;
  clearTimeout(pigeonPopoutTimer);
  pigeonOverlay.classList.remove("is-timing");
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

function updateCreatorStudio() {
  if (creatorFlowLocked) {
    setCreatorPhase("case");
    creatorReadiness.textContent = "Choose a case";
    creatorProgress.textContent = "0%";
    creatorMeter.style.width = "0%";
    creatorPigeon.classList.remove("ready");
    creatorTierStatus.textContent = "Level 1: Nest";
    creatorTierStages.forEach((stage, index) => stage.classList.toggle("active", index === 0));
    sourceIssue.textContent = "No case selected";
    aiIssue.textContent = "No case selected";
    urgencyIssue.textContent = "No case selected";
    creatorCopy.classList.remove("tone-balanced", "is-highlighted");
    creatorUploadPanel?.classList.remove("active");
    setCreatorActionsDisabled(true);
    return;
  }

  updateCreatorAnalysis(creatorCurrentDraft);
}

creatorCaseGrid?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-creator-case]");
  if (!button) return;
  dismissCreatorTutorial();
  setCreatorCase(Number(button.dataset.creatorCase));
});

uploadCaseGrid?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-image-case]");
  if (!button || creatorFlowLocked) return;
  setImageCase(Number(button.dataset.imageCase));
});

creatorSourceAction.addEventListener("click", () => {
  creatorCurrentDraft = {
    ...creatorCurrentDraft,
    fixes: { ...creatorCurrentDraft.fixes, source: !creatorCurrentDraft.fixes.source },
  };
  updateCreatorStudio();
});
creatorAiAction.addEventListener("click", () => {
  creatorCurrentDraft = {
    ...creatorCurrentDraft,
    fixes: { ...creatorCurrentDraft.fixes, ai: !creatorCurrentDraft.fixes.ai },
  };
  updateCreatorStudio();
});
creatorToneAction.addEventListener("click", () => {
  creatorCurrentDraft = {
    ...creatorCurrentDraft,
    fixes: { ...creatorCurrentDraft.fixes, tone: !creatorCurrentDraft.fixes.tone },
  };
  updateCreatorStudio();
});

publishTrigger.addEventListener("click", () => {
  if (Object.values(creatorCurrentDraft.fixes).every(Boolean)) {
    creatorReadiness.textContent = "Published with context";
  } else {
    creatorPigeon.classList.add("needs-attention");
    setTimeout(() => creatorPigeon.classList.remove("needs-attention"), 500);
  }
});

updateCreatorStudio();
setCreatorPhase("case");

setPlatform("tiktok");
setPerspective("viewer");
