const header = document.querySelector(".site-header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 12) {
      header.style.boxShadow = "0 10px 32px rgba(23, 50, 77, 0.08)";
    } else {
      header.style.boxShadow = "none";
    }
  });
}

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
        mediaImage: "Picture/News/tiktok_citybrief.png",
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
        mediaImage: "Picture/News/tiktok_quickupdate.png",
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
        mediaImage: "Picture/News/tiktok_alertwrite.png",
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
        mediaImage: "Picture/News/fb_library.png",
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
        mediaImage: "Picture/News/fb_neighbor.png",
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
        mediaImage: "Picture/News/fb_parentsafety.png",
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
    subtitle: "",
    examples: [
      {
        grade: "b",
        moment: "Note detail page",
        media: "Xiaohongshu Note",
        mediaImage: "Picture/News/xhs_health.png",
        creator: "Health Notice Desk",
        meta: "Note detail · source included",
        text: "Health bureau confirms limited recall for one bottled tea batch",
        body: "The note lists the official notice, batch number, and refund channel, so readers can verify the recall before sharing.",
        idle: "Use Share note to simulate a B-grade lifestyle-news post with visible source context.",
        question: "This note includes a source and batch detail. Do you want to keep that context attached?",
        signals: ["Official source", "Batch detail", "Low urgency"],
        summary: "Recall source cited",
        notice: "Notice: Source and context are visible. Keep them attached if you share.",
      },
      {
        grade: "c",
        moment: "Note detail page",
        media: "Xiaohongshu Note",
        mediaImage: "Picture/News/xhs_smoke.png",
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
        mediaImage: "Picture/News/xhs_hospital.png",
        creator: "Clinic Rumor Watch",
        meta: "Note detail · forwarded post",
        text: "Forwarded hospital screenshot claims a new outbreak is being hidden",
        body: "The post uses a cropped chat screenshot as evidence, but shows no hospital notice, date, department, or traceable origin.",
        idle: "Use Share note to simulate a D-grade health rumor post.",
        question: "This post treats a cropped screenshot as evidence. Should it be shared as-is?",
        signals: ["No origin", "Health rumor", "Screenshot claim"],
        summary: "High-risk health rumor",
        notice: "Notice: Cropped hospital screenshot has no traceable source or timestamp.",
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
        mediaImage: "Picture/News/ins_newsroom.png",
        creator: "@newsroom",
        meta: "Story repost · source tagged",
        text: "City transit update: service alert is confirmed for the morning commute.",
        caption: "Source-linked update with a clear correction note.",
        idle: "Use Repost story to simulate a B-grade visual post with source context.",
        question: "The story tags its source and correction. Do you want to keep that context attached?",
        signals: ["Source tagged", "Correction shown", "Low pressure"],
        summary: "Source context visible",
        notice: "Notice: Source and correction context are visible.",
      },
      {
        grade: "c",
        moment: "Story reshare",
        media: "Story Preview",
        mediaImage: "Picture/News/ins_visualdigest.png",
        creator: "@visualdigest",
        meta: "Story repost · edited image",
        text: "Photo from today's downtown gathering is being reposted without the original caption.",
        caption: "Edit history and original source are not visible.",
        idle: "Use Repost story to simulate a C-grade visual post with incomplete context.",
        question: "Is the image source, edit history, or AI use disclosed?",
        signals: ["Visual context", "Emotional pressure", "AI disclosure"],
        summary: "Edit context missing",
        notice: "Notice: Image source or edit history is not visible.",
      },
      {
        grade: "d",
        moment: "Story reshare",
        media: "Story Preview",
        mediaImage: "Picture/News/ins_shockdaily.png",
        creator: "@shockdaily",
        meta: "Story repost · viral screenshot",
        text: "Reposted screenshot claims bottled water in stores is contaminated.",
        caption: "No origin, timestamp, or health agency notice is shown.",
        idle: "Use Repost story to simulate a D-grade rumor-style story post.",
        question: "This screenshot makes a serious claim without traceable origin. Continue sharing?",
        signals: ["No origin", "Manipulation risk", "High pressure"],
        summary: "High-risk screenshot",
        notice: "Notice: Viral screenshot has no traceable origin or verification.",
      },
    ],
  },
};

const platformTabs = document.querySelectorAll(".platform-tab");
const scenarioNavButtons = document.querySelectorAll(".scenario-nav");
const perspectiveTabs = document.querySelectorAll(".perspective-tab");
const simulationSection = document.querySelector(".simulation-section");
const platformName = document.querySelector("#platformName");
const platformMoment = document.querySelector("#platformMoment");
const contentMediaFrame = document.querySelector("#contentMedia");
const contentMedia = document.querySelector("#contentMediaLabel");
const tiktokNewsImage = document.querySelector("#tiktokNewsImage");
const tiktokCreator = document.querySelector("#tiktokCreator");
const tiktokText = document.querySelector("#tiktokText");
const tiktokMeta = document.querySelector("#tiktokMeta");
const facebookCreator = document.querySelector("#facebookCreator");
const facebookMeta = document.querySelector("#facebookMeta");
const facebookText = document.querySelector("#facebookText");
const facebookMedia = document.querySelector("#facebookMedia");
const facebookNewsImage = document.querySelector("#facebookNewsImage");
const facebookMediaLabel = document.querySelector("#facebookMediaLabel");
const instagramCreator = document.querySelector("#instagramCreator");
const instagramMeta = document.querySelector("#instagramMeta");
const instagramMedia = document.querySelector("#instagramMedia");
const instagramNewsImage = document.querySelector("#instagramNewsImage");
const instagramText = document.querySelector("#instagramText");
const instagramCaptionCreator = document.querySelector("#instagramCaptionCreator");
const instagramCaptionText = document.querySelector("#instagramCaptionText");
const xhsCreator = document.querySelector("#xhsCreator");
const xhsTitle = document.querySelector("#xhsTitle");
const xhsText = document.querySelector("#xhsText");
const xhsNewsImage = document.querySelector("#xhsNewsImage");
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
const creatorSourceAction = document.querySelector("#creatorSourceAction");
const creatorAiAction = document.querySelector("#creatorAiAction");
const creatorToneAction = document.querySelector("#creatorToneAction");
const creatorReadiness = document.querySelector("#creatorReadiness");
const creatorProgress = document.querySelector("#creatorProgress");
const creatorMeter = document.querySelector("#creatorMeter");
const sourceIssue = document.querySelector("#sourceIssue");
const aiIssue = document.querySelector("#aiIssue");
const urgencyIssue = document.querySelector("#urgencyIssue");
const creatorCopy = document.querySelector("#creatorCopy");
const creatorGuidance = document.querySelector("#creatorGuidance");
const creatorContextLine = document.querySelector("#creatorContextLine");
const creatorContextText = document.querySelector("#creatorContextText");
const creatorDisclosureLine = document.querySelector("#creatorDisclosureLine");
const creatorPostVisual = document.querySelector("#creatorPostVisual");
const creatorPreviewImage = document.querySelector("#creatorPreviewImage");
const creatorImageAnalysis = document.querySelector("#creatorImageAnalysis");
const creatorImageAnalysisTitle = document.querySelector("#creatorImageAnalysisTitle");
const creatorImageAnalysisText = document.querySelector("#creatorImageAnalysisText");
const creatorTierStatus = document.querySelector("#creatorTierStatus");
const creatorTierStages = document.querySelectorAll(".creator-tier-stage");
const creatorXpNotice = document.querySelector("#creatorXpNotice");

const creatorDraftCases = [
  {
    title: "Breaking image",
    handle: "@citysignal",
    meta: "Breaking visual update · public post",
    mediaImage: "Picture/News/xhs_smoke.png",
    draft: "This smoke photo proves the downtown explosion happened today. Everyone should share it before it disappears.",
    segments: [
      { text: "This smoke photo proves", className: "urgency-flag" },
      { text: "the downtown explosion happened today.", className: "share-flag" },
      { text: "Everyone should share it before it disappears.", className: "" },
    ],
    fixes: { source: false, ai: false, tone: false },
    progressLabel: "Needs context",
    tierIndex: 0,
    analysisTitle: "Source, tone, and AI disclosure all need work",
    analysisBody: "PIGEON flags this as a high-pressure claim with no source attached and synthetic media risk.",
    imageAnalysisTitle: "Smoke image needs a traceable origin",
    imageAnalysisBody: "The visual looks like evidence, but its original source, date, and edit history are not shown.",
    improvedCaption: "A smoke photo is circulating after a reported downtown incident. The original source and timing still need verification before sharing.",
    sourceContext: "Source context: Official incident notice · verification link attached",
  },
  {
    title: "School alert",
    handle: "@parentcircle",
    meta: "Community warning · forward",
    mediaImage: "Picture/News/fb_parentsafety.png",
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
    analysisTitle: "Urgency is high and the source is missing",
    analysisBody: "PIGEON asks for the official notice first, then suggests reducing the pressure to forward it immediately.",
    imageAnalysisTitle: "Safety notice needs an official source",
    imageAnalysisBody: "The image presents a public warning, but no school, agency, date, or original notice is visible.",
    improvedCaption: "A school closure notice is circulating in the parent community. Please check the official school or district update before forwarding.",
    sourceContext: "Source context: School or district notice · verification link attached",
  },
  {
    title: "Product warning",
    handle: "@parentwatch",
    meta: "Consumer safety post · public group",
    mediaImage: "Picture/News/fb_neighbor.png",
    draft: "Do not use this baby chair. Parents say the brand is hiding a safety recall, and everyone should warn their friends now.",
    segments: [
      { text: "Do not use this baby chair.", className: "urgency-flag" },
      { text: "the brand is hiding a safety recall", className: "share-flag" },
      { text: "and everyone should warn their friends now.", className: "" },
    ],
    fixes: { source: false, ai: true, tone: false },
    progressLabel: "Warning mode",
    tierIndex: 2,
    analysisTitle: "Consumer warning needs a named recall source",
    analysisBody: "PIGEON sees a strong warning without a clear citation, so it stays in check mode until the source is added.",
    imageAnalysisTitle: "Product safety image needs context",
    imageAnalysisBody: "The chair is visible, but the post does not show a product model, recall notice, or traceable safety source.",
    improvedCaption: "Parents are discussing a possible safety issue involving this baby chair. Check the model and official recall information before sharing.",
    sourceContext: "Source context: Product model and recall notice · verification link attached",
  },
];


let activePlatform = "tiktok";
let activeScenario = platformScenarios.tiktok.examples[1];
let activeScenarioIndex = 0;
let pigeonPopoutTimer;
let creatorTypingTimer;
let creatorUploadReadyTimer;
let creatorXpTimer;
let activeCreatorCaseIndex = 0;
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

function setCreatorGuidance(message, mode = "") {
  if (creatorGuidance) creatorGuidance.textContent = message;
  creatorEditor?.classList.toggle("guide-improve", mode === "improve");
  creatorEditor?.classList.toggle("guide-publish", mode === "publish");
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
  setCreatorActionsDisabled(!ready);
}

function clearCreatorTimers() {
  clearTimeout(creatorTypingTimer);
  clearTimeout(creatorUploadReadyTimer);
}

function updateCreatorCaseButtons(index) {
  creatorCaseGrid?.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.creatorCase) === index);
  });
}

function setCreatorTutorialVisible(isVisible) {
  const shouldShow = Boolean(isVisible && !creatorTutorialDismissed && creatorFlowLocked);
  creatorEditor?.classList.toggle("tutorial-active", shouldShow);
  creatorCaseGrid?.classList.toggle("tutorial-target", shouldShow);
  if (shouldShow) {
    setCreatorGuidance("Step 1: choose any case to begin the guided creator flow.");
  }
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
  creatorTierStatus.textContent = ["Level 1: Nesting", "Level 2: Fledging", "Level 3: Soaring", "Level 4: Pioneering"][caseData.tierIndex];
  creatorTierStages.forEach((stage, index) => stage.classList.toggle("active", index === caseData.tierIndex));
  sourceIssue.textContent = fixes.source ? "Source linked" : "No source cited";
  sourceIssue.classList.toggle("resolved", fixes.source);
  aiIssue.textContent = fixes.ai ? "AI media disclosed" : "AI disclosure missing";
  aiIssue.classList.toggle("resolved", fixes.ai);
  urgencyIssue.textContent = fixes.tone ? "Tone balanced" : "High urgency language";
  urgencyIssue.classList.toggle("resolved", fixes.tone);
  creatorCopy.classList.toggle("tone-balanced", fixes.tone);
  creatorCopy.classList.add("is-highlighted");
  if (fixes.tone) {
    creatorCopy.textContent = caseData.improvedCaption;
  } else {
    renderTypedDraft(caseData);
  }
  creatorContextLine.classList.toggle("hidden", !fixes.source);
  creatorContextText.textContent = caseData.sourceContext;
  creatorDisclosureLine.classList.toggle("hidden", !fixes.ai);
  creatorImageAnalysisTitle.textContent = caseData.imageAnalysisTitle;
  creatorImageAnalysisText.textContent = caseData.imageAnalysisBody;
  creatorImageAnalysis.classList.remove("hidden");
  creatorImageAnalysis.classList.add("active");
  setCreatorPhase("analyze");
  if (count === 3) {
    setCreatorGuidance("Final step: the draft is ready. Publish to earn Trust XP.", "publish");
  } else {
    setCreatorGuidance("Step 3: read the analysis, then use the suggested improvements on the right.", "improve");
  }

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
  creatorContextLine.classList.add("hidden");
  creatorDisclosureLine.classList.add("hidden");
  creatorXpNotice.classList.add("hidden");
  creatorImageAnalysis.classList.add("hidden");
  creatorImageAnalysis.classList.remove("active");
  setCreatorGuidance("Step 2: watch the caption appear, then read PIGEON's analysis.");
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
        typingStatus.textContent = "Caption analyzed";
      }, 360);
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
  creatorTierStatus.textContent = "Level 1: Nesting";
  creatorTierStages.forEach((stage, stageIndex) => stage.classList.toggle("active", stageIndex === 0));
  sourceIssue.textContent = "Loading...";
  aiIssue.textContent = "Loading...";
  urgencyIssue.textContent = "Loading...";
  typingStatus.textContent = "Typing draft...";
  creatorPostVisual.classList.remove("hidden");
  creatorPreviewImage.src = caseData.mediaImage;
  creatorPreviewImage.alt = `${caseData.title} simulated news image`;
  typeCreatorDraft(caseData);
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
  const hasTiktokImage = platformKey === "tiktok" && Boolean(scenario.mediaImage);
  contentMediaFrame?.classList.toggle("has-platform-image", hasTiktokImage);
  tiktokNewsImage?.classList.toggle("hidden", !hasTiktokImage);

  if (platformKey === "tiktok") {
    if (scenario.mediaImage && tiktokNewsImage) {
      tiktokNewsImage.src = scenario.mediaImage;
    }
    tiktokCreator.textContent = scenario.creator;
    tiktokText.textContent = scenario.text;
    tiktokMeta.textContent = scenario.meta;
  }

  if (platformKey === "facebook") {
    facebookCreator.textContent = scenario.creator;
    facebookMeta.textContent = scenario.meta;
    facebookText.textContent = scenario.text;
    facebookMedia.classList.toggle("has-platform-image", Boolean(scenario.mediaImage));
    facebookNewsImage?.classList.toggle("hidden", !scenario.mediaImage);
    if (scenario.mediaImage && facebookNewsImage) {
      facebookNewsImage.src = scenario.mediaImage;
    }
    if (facebookMediaLabel) facebookMediaLabel.textContent = scenario.media;
  }

  if (platformKey === "instagram") {
    instagramCreator.textContent = scenario.creator;
    instagramCaptionCreator.textContent = scenario.creator;
    instagramMeta.textContent = scenario.meta;
    instagramMedia.textContent = scenario.media;
    instagramText.textContent = scenario.text;
    instagramCaptionText.textContent = scenario.text;
    instagramNewsImage?.classList.toggle("hidden", !scenario.mediaImage);
    if (scenario.mediaImage && instagramNewsImage) {
      instagramNewsImage.src = scenario.mediaImage;
      instagramNewsImage.alt = `${scenario.creator} simulated Instagram news post`;
    }
  }

  if (platformKey === "xiaohongshu") {
    if (scenario.mediaImage && xhsNewsImage) {
      xhsNewsImage.src = scenario.mediaImage;
    }
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

function setViewerScenario(platformKey, scenarioIndex = 0) {
  const platform = platformScenarios[platformKey];
  const scenario = platform?.examples?.[scenarioIndex];
  if (!platform || !scenario) return;
  activePlatform = platformKey;
  activeScenario = scenario;
  activeScenarioIndex = scenarioIndex;

  platformTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.platform === platformKey);
  });

  simulationStage.dataset.platformView = platformKey;
  simulationStage.dataset.scenarioIndex = String(scenarioIndex);
  simulationStage.dataset.scenarioGrade = scenario.grade;
  platformName.textContent = platform.name;
  platformMoment.textContent = scenario.moment;
  contentMedia.textContent = scenario.media;
  overlayTitle.textContent = platform.title;
  overlaySubtitle.textContent = platform.subtitle;
  overlaySubtitle.classList.toggle("hidden", !platform.subtitle);
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

function setPlatform(platformKey) {
  setViewerScenario(platformKey, 0);
}

platformTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPlatform(tab.dataset.platform));
});

scenarioNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const examples = platformScenarios[activePlatform]?.examples || [];
    if (!examples.length) return;
    const direction = Number(button.dataset.scenarioDirection);
    const nextIndex = (activeScenarioIndex + direction + examples.length) % examples.length;
    setViewerScenario(activePlatform, nextIndex);
  });
});

perspectiveTabs.forEach((tab) => {
  tab.addEventListener("click", () => setPerspective(tab.dataset.perspective));
});

triggerPigeon.addEventListener("click", () => {
  showPigeonPopout();
  actionStatus.textContent = activeScenario.triggered;
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
    creatorTierStatus.textContent = "Level 1: Nesting";
    creatorTierStages.forEach((stage, index) => stage.classList.toggle("active", index === 0));
    sourceIssue.textContent = "No case selected";
    aiIssue.textContent = "No case selected";
    urgencyIssue.textContent = "No case selected";
    creatorCopy.classList.remove("tone-balanced", "is-highlighted");
    setCreatorGuidance("Step 1: choose any case to begin the guided creator flow.");
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
    clearTimeout(creatorXpTimer);
    creatorXpNotice.classList.remove("hidden");
    creatorXpNotice.classList.remove("is-new");
    void creatorXpNotice.offsetWidth;
    creatorXpNotice.classList.add("is-new");
    creatorXpTimer = setTimeout(() => creatorXpNotice.classList.add("hidden"), 2800);
    setCreatorGuidance("Published with context. Trust XP has been added.");
    const nextTierIndex = Math.min(creatorCurrentDraft.tierIndex + 1, creatorTierStages.length - 1);
    creatorTierStages.forEach((stage, index) => stage.classList.toggle("active", index === nextTierIndex));
    creatorTierStatus.textContent = ["Level 1: Nesting", "Level 2: Fledging", "Level 3: Soaring", "Level 4: Pioneering"][nextTierIndex];
  } else {
    setCreatorGuidance("Complete the suggested improvements before publishing.", "improve");
    creatorPigeon.classList.add("needs-attention");
    setTimeout(() => creatorPigeon.classList.remove("needs-attention"), 500);
  }
});

updateCreatorStudio();
setCreatorPhase("case");

setViewerScenario("tiktok", 0);
setPerspective("viewer");
