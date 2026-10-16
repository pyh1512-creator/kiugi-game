/**
 * Feed & Grow Jinwoo - Game Controller & Infinite Growth System
 * Full Idle & Clicker mechanics, BigNumber formatting, Drag-and-drop food feeding,
 * Particle engine, Offline progression, and Stage background transitions!
 */

// --- Number Formatter for Infinite Scaling ---
const NUMBER_UNITS = [
  "", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", 
  "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg", "Infinity"
];

function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  if (num < 1000) {
    return num % 1 === 0 ? num.toString() : num.toFixed(1);
  }
  
  const exp = Math.floor(Math.log10(num) / 3);
  if (exp >= NUMBER_UNITS.length) {
    return num.toExponential(2);
  }
  
  const unit = NUMBER_UNITS[exp];
  const scaled = num / Math.pow(10, exp * 3);
  return scaled.toFixed(scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2) + " " + unit;
}

function formatWeight(kg) {
  if (kg < 1000) {
    return { val: kg.toFixed(1), unit: "kg" };
  } else if (kg < 1e6) {
    return { val: (kg / 1000).toFixed(2), unit: "톤(Ton)" };
  } else if (kg < 5.972e24) {
    const tons = kg / 1000;
    return { val: formatNumber(tons), unit: "톤(Ton)" };
  } else {
    // Bigger than Planet Earth (5.972e24 kg)
    const earthCount = kg / 5.972e24;
    return { val: formatNumber(earthCount), unit: "지구(Earth)" };
  }
}

// --- Funny & Epic Multi-Anime Dialogues for Jinwoo ---
const JINWOO_DIALOGUES = [
  "하아아앗! 전신의 기(Ki)가 폭발할 것 같다!",
  "일어나라...(Arise) 내 위장의 그림자 병단들이여!",
  "영역 전개... 복마어주자! 모든 음식을 참격으로 썰어 먹겠다!",
  "해방의 드럼 소리가 들리는가?! 둠칫 둠칫 태양의 신 니카 예훈이다!",
  "전집중... 해의 호흡 13형! 폭풍 식사 카구라!",
  "내 드릴은 하늘을 뚫을 드릴이다! 나선력으로 햄버거를 흡수한다!",
  "잡종... 감히 영웅왕의 황금 만찬을 훔쳐보느냐!",
  "취미로 근성장을 하는 사람이다. 진심 펀치 냠냠!",
  "카... 메... 하... 메... 밥!!",
  "단백질을 흡수할 때마다 다중 차원의 벽이 찢어진다!",
  "나의 한계는 10000레벨 너머에도 없다! 끝없이 진화한다!"
];

// --- 16 Major Anime Crossover Evolution Milestones up to Lv. 10000 ---
const STAGE_TIERS = [
  { lv: 1, title: "1단계: 거북선류 수련생 손예훈", sub: "드래곤볼 - 노말 도복", bg: "stage-room", icon: "🥋", msg: "사이어인의 피가 끓어오른다! 거북선류 도복을 입고 수련 시작!" },
  { lv: 100, title: "2단계: 계왕권 초사이어인", sub: "드래곤볼 - 카이오켄 & 번개", bg: "stage-kame", icon: "🔥", msg: "황금빛 초사이어인 헤어와 계왕권의 붉은 화염 오라 대폭발!" },
  { lv: 250, title: "3단계: 나뭇잎 닌자 구미 차크라", sub: "나루토 - 쿠라마 모드 & 서클릿", bg: "stage-konoha", icon: "🍃", msg: "나뭇잎 서클릿 장착! 황금빛 구미호 차크라가 온몸을 감쌉니다!" },
  { lv: 500, title: "4단계: 만해 천쇄참월 호로화", sub: "블리치 - 사패장 & 호로 가면 뿔", bg: "stage-seireitei", icon: "⚔️", msg: "엎드려 살지 마라, 일어나 죽는 거다! 칠흑의 월아천충 영압 각성!" },
  { lv: 750, title: "5단계: 태양의 신 니카 기어 5", sub: "원피스 - 순백 깃털 구름 헤어", bg: "stage-egghead", icon: "☁️", msg: "둠칫 둠칫! 해방의 드럼 소리와 함께 자유자재 태양의 신 강림!" },
  { lv: 1000, title: "6단계: 해의 호흡 히노카미 카구라", sub: "귀멸의 칼날 - 이마 화염 반점", bg: "stage-mugen-train", icon: "☀️", msg: "마음을 불태워라! 이마의 화염 반점과 불타는 일륜도 화염 검기!" },
  { lv: 1500, title: "7단계: 저주의 왕 료멘 스쿠나", sub: "주술회전 - 전신 칠흑 주력 문신", bg: "stage-shibuya", icon: "👹", msg: "영역 전개 복마어주자! 전신에 새겨진 저주의 문신과 개(開)의 화염!" },
  { lv: 2000, title: "8단계: 그림자 군주 성예훈", sub: "나 혼자만 레벨업 - 보랏빛 안광 & 갑주", bg: "stage-shadow-realm", icon: "👑", msg: "일어나라(Arise)! 죽음을 지배하는 칠흑의 그림자 군주 완전 각성!" },
  { lv: 3000, title: "9단계: 극한 제약과 서약 곤육몬", sub: "헌터x헌터 - 수직 솟구치는 칠흑 기둥 헤어", bg: "stage-chimera", icon: "🗿", msg: "이걸로 다 끝나도 좋아... 하늘 끝까지 솟구친 칠흑 기둥 헤어와 기가채드 신체!" },
  { lv: 4000, title: "10단계: 영웅왕 게이트 오브 바빌론", sub: "페이트 - 황금 갑주 & 보구 포탈", bg: "stage-babylon", icon: "🏛️", msg: "감히 왕을 쳐다보느냐 잡종! 등 뒤에 열린 무수한 황금 차원 포탈!" },
  { lv: 5000, title: "11단계: 진심 시리즈 사이타마", sub: "원펀맨 - 노란 슈트 & 대기 파쇄", bg: "stage-city-z", icon: "🥊", msg: "취미로 히어로를 하는 사람이다. 대기권을 쪼개는 진심 펀치 충격파!" },
  { lv: 6000, title: "12단계: 초호기 각성 유사신화", sub: "에반게리온 - 보라 장갑 & AT 필드 & 천사 링", bg: "stage-geofront", icon: "🧬", msg: "인간의 영역을 초월한 신에 가까운 존재! 거대 천사 링과 AT 필드!" },
  { lv: 7000, title: "13단계: 초천원돌파 나선신", sub: "그렌라간 - 가슴 선글라스 & 나선 드릴", bg: "stage-spiral-space", icon: "🌀", msg: "우리를 누구라고 생각하느냐! 은하계를 꿰뚫는 초거대 나선 드릴!" },
  { lv: 8000, title: "14단계: 완성형 무의식의 극의", sub: "드래곤볼 슈퍼 - 순백 은발 & 신의 열기", bg: "stage-null-realm", icon: "🌌", msg: "생각보다 몸이 먼저 반응한다! 눈부신 은발과 7구 드래곤볼의 공전!" },
  { lv: 9000, title: "15단계: 다중 애니메 옴니버스 패왕", sub: "올 애니메 능력 융합 궁극체", bg: "stage-omniverse", icon: "♾️", msg: "모든 전설 애니의 힘이 하나로 융합된 절대 차원 옴니버스 패왕!" },
  { lv: 10000, title: "16단계: 전지전능 애니메 절대신 박예훈", sub: "Lv.10000 MAX 불멸의 절대자", bg: "stage-omnipotent", icon: "👑✨", msg: "축하합니다! 10000레벨 정점 도달! 다중우주와 모든 애니 세계관을 초월한 애니메 절대신 박예훈!" }
];

function getAnimeTierIndex(level) {
  let index = 0;
  for (let i = 0; i < STAGE_TIERS.length; i++) {
    if (level >= STAGE_TIERS[i].lv) {
      index = i;
    } else {
      break;
    }
  }
  return index;
}

function calculateReqExp(level) {
  if (level >= 10000) return 999999999999;
  if (level < 20) {
    return Math.floor(30 + (level - 1) * 20 + Math.pow(level, 1.2) * 8);
  } else if (level < 100) {
    return Math.floor(300 + (level - 20) * 60 + Math.pow(level, 1.4) * 15);
  } else if (level < 500) {
    return Math.floor(8000 + (level - 100) * 350 + Math.pow(level, 1.6) * 30);
  } else if (level < 2000) {
    return Math.floor(250000 + (level - 500) * 3000 + Math.pow(level, 1.75) * 45);
  } else {
    return Math.floor(8000000 + (level - 2000) * 25000 + Math.pow(level, 1.85) * 60);
  }
}

function getStageData(level) {
  const tierIndex = getAnimeTierIndex(level);
  const baseTier = STAGE_TIERS[tierIndex];
  const reqExp = calculateReqExp(level);

  return {
    level: level,
    title: baseTier.title,
    sub: baseTier.sub,
    bgClass: baseTier.bg,
    icon: baseTier.icon,
    reqExp: reqExp,
    message: baseTier.msg,
    tierIndex: tierIndex
  };
}

// --- Food Items Database (Rich Multi-Anime Delicacies) ---
const FOOD_CATALOG = [
  { id: "bungeoppang", name: "단팥 붕어빵", icon: "🐟", baseCal: 50, cost: 0, unlockLevel: 1, desc: "무한 공짜! 광클로 폭풍 벌크업 시작!" },
  { id: "samgak", name: "참치마요 삼각김밥", icon: "🍙", baseCal: 220, cost: 20, unlockLevel: 1, desc: "단백질과 탄수화물의 황금 밸런스" },
  { id: "ramen", name: "얼큰 컵라면", icon: "🍜", baseCal: 850, cost: 70, unlockLevel: 2, desc: "국물까지 원샷해야 근성장 폭발!" },
  { id: "hotdog", name: "치즈 핫도그", icon: "🌭", baseCal: 2800, cost: 220, unlockLevel: 5, desc: "늘어나는 치즈와 소시지 파워" },
  { id: "burger", name: "빅 불고기버거", icon: "🍔", baseCal: 8500, cost: 750, unlockLevel: 10, desc: "패티 세 장과 묵직한 벌크업 열량" },
  { id: "chicken", name: "황금 양념치킨", icon: "🍗", baseCal: 28000, cost: 2400, unlockLevel: 25, desc: "바삭 촉촉 1인 5닭 프로틴 폭탄!" },
  { id: "pizza", name: "치즈 폭탄 피자", icon: "🍕", baseCal: 95000, cost: 7500, unlockLevel: 50, desc: "대흉근에 기름칠하는 고칼로리 축제" },
  { id: "samgyeop", name: "돌판 삼겹살 세트", icon: "🥓", baseCal: 320000, cost: 25000, unlockLevel: 80, desc: "지글지글 마늘과 함께 10인분 뚝딱" },
  { id: "sensu", name: "신선의 선두 (Senzu)", icon: "🫘", baseCal: 1200000, cost: 90000, unlockLevel: 100, desc: "기력 100% 회복! 초사이어인의 근성장 콩" },
  { id: "ichiraku_ramen", name: "일락 라멘 차슈 곱빼기", icon: "🍜", baseCal: 4500000, cost: 340000, unlockLevel: 250, desc: "구미호 차크라가 솟구치는 나뭇잎 마을 명물" },
  { id: "meat_bone", name: "루피의 해적 만화고기", icon: "🍖", baseCal: 18000000, cost: 1350000, unlockLevel: 500, desc: "기어 5 태양의 신 니카의 해방의 드럼 칼로리!" },
  { id: "demon_bento", name: "렌고쿠의 우마이! 규동", icon: "🍱", baseCal: 75000000, cost: 5200000, unlockLevel: 750, desc: "맛있다!! 화염의 호흡으로 불타는 전설의 도시락" },
  { id: "sukuna_finger", name: "특급 주물 스쿠나의 손가락", icon: "👆", baseCal: 320000000, cost: 22000000, unlockLevel: 1000, desc: "저주의 왕의 맹독성 칼로리! 삼키면 주력 폭발!" },
  { id: "shadow_potion", name: "군주의 엘릭서 엑기스", icon: "🧪", baseCal: 1400000000, cost: 95000000, unlockLevel: 2000, desc: "그림자 군주의 차원 마력이 농축된 성수" },
  { id: "saitama_hotpot", name: "사이타마의 특매 배추전골", icon: "🍲", baseCal: 6000000000, cost: 420000000, unlockLevel: 4000, desc: "어떤 괴수도 한 방에 날리는 진심 파워의 원천" },
  { id: "spiral_core", name: "초천원돌파 나선 에너지", icon: "🌀", baseCal: 28000000000, cost: 1800000000, unlockLevel: 6000, desc: "내 드릴은 하늘을 뚫을 드릴이다! 무한 나선 칼로리" },
  { id: "cosmic_ambrosia", name: "전지전능 다중우주 신의 만찬", icon: "👑", baseCal: 120000000000, cost: 8000000000, unlockLevel: 8000, desc: "Lv.10000 애니메 절대신을 위한 무한 불멸의 만찬" }
];

// --- Auto-Feeder / Idle Helpers Database ---
const AUTO_FEEDERS = [
  { id: "grandma", name: "옆집 할머니의 간식", icon: "👵", baseCps: 30, baseCost: 35, count: 0, desc: "우리 손주 말랐다고 쉴 새 없이 떡을 주심" },
  { id: "rider", name: "배달의 라이더 친구", icon: "🛵", baseCps: 180, baseCost: 240, count: 0, desc: "오토바이로 갓 튀긴 치킨을 쉴 새 없이 투척" },
  { id: "karin_cat", name: "카린탑의 카린 선인", icon: "🐱", baseCps: 1200, baseCost: 1600, count: 0, desc: "구름 위 카린탑에서 선두를 쉴 새 없이 배급" },
  { id: "ichiraku_chef", name: "일락 라멘 테우치 아저씨", icon: "👨‍🍳", baseCps: 8000, baseCost: 11000, count: 0, desc: "닌자들의 체력을 책임지는 전설의 라멘 셰프" },
  { id: "shadow_soldiers", name: "그림자 병단 친위대", icon: "👤", baseCps: 55000, baseCost: 78000, count: 0, desc: "'일어나라!' 그림자 기사들이 산더미 같은 고기를 조달" },
  { id: "gate_of_food", name: "게이트 오브 바빌론 급식소", icon: "🏛️", baseCps: 420000, baseCost: 600000, count: 0, desc: "황금 차원 포탈에서 무수한 왕의 산해진미가 쏟아짐" },
  { id: "spiral_generator", name: "초천원돌파 나선력 발전기", icon: "🛸", baseCps: 3200000, baseCost: 4800000, count: 0, desc: "은하계를 돌리며 햄버거와 스테이크를 시공간 복제" }
];

// --- Stomach Upgrades Database ---
const STOMACH_UPGRADES = [
  { id: "jaw_strength", name: "강철 턱관절", icon: "🦷", desc: "한입당 먹는 씹는 파워가 1.5배 상승", level: 1, baseCost: 80, mult: 1.5 },
  { id: "gold_stomach", name: "황금 위장", icon: "✨", desc: "크리티컬 섭취 확률 +4% 및 5배 폭풍 성장", level: 0, baseCost: 350, critBonus: 0.04 },
  { id: "jelly_belly", name: "탱탱 뱃살 스프링", icon: "🍮", desc: "예훈의 배를 찌를 때 주는 코인과 칼로리 2배", level: 1, baseCost: 500, tapMult: 2.0 },
  { id: "blackhole_gut", name: "블랙홀 소화기", icon: "🕳️", desc: "모든 음식 및 자동 섭취량 25% 영구 부스트", level: 0, baseCost: 4500, globalMult: 1.25 }
];

// --- Costumes Database ---
const COSTUMES = [
  { id: "default", name: "자취생 러닝셔츠", icon: "🎽", reqLevel: 1, desc: "편안함 그 자체의 늘어난 흰색 셔츠" },
  { id: "chef", name: "마스터 셰프 모자", icon: "👨‍🍳", reqLevel: 10, desc: "음식 섭취 시 추가 코인 +10%" },
  { id: "gold", name: "스웨그 금목걸이 & 선글라스", icon: "🕶️", reqLevel: 25, desc: "간지 폭발! 크리티컬 확률 +10%" },
  { id: "crown", name: "식신의 황금 왕관", icon: "👑", reqLevel: 45, desc: "위엄 있는 푸드 킹! 모든 성장 속도 +20%" },
  { id: "space", name: "우주 비행 헬멧", icon: "🚀", reqLevel: 70, desc: "대기권 밖에서도 안심하고 먹방 가능" }
];

// --- Achievements Database ---
const ACHIEVEMENTS = [
  { id: "first_bite", title: "첫 숟가락", desc: "예훈에게 첫 음식을 먹이기", icon: "🥄", check: (g) => g.stats.totalFoodEaten >= 1 },
  { id: "belly_tap_10", title: "출렁이는 뱃살", desc: "예훈의 배를 10번 찌르기", icon: "🍮", check: (g) => g.stats.totalClicks >= 10 },
  { id: "combo_15", title: "폭풍 흡입", desc: "15 콤보 달성하기", icon: "🔥", check: (g) => g.combo >= 15 },
  { id: "reach_level_5", title: "살찌는 재미", desc: "성장 레벨 5 달성하기", icon: "🍔", check: (g) => g.level >= 5 },
  { id: "reach_level_15", title: "건물급 피지컬", desc: "성장 레벨 15 달성하기", icon: "🏢", check: (g) => g.level >= 15 },
  { id: "reach_level_40", title: "지구는 나의 방석", desc: "성장 레벨 40 달성하기", icon: "🌍", check: (g) => g.level >= 40 },
  { id: "reach_level_75", title: "우주적 대식가", desc: "성장 레벨 75 코스믹 달성", icon: "🌌", check: (g) => g.level >= 75 },
  { id: "buy_auto_all", title: "먹방 CEO", desc: "모든 자동 알바를 최소 1명씩 고용", icon: "💼", check: (g) => g.autoFeeders.every(a => a.count >= 1) },
  { id: "coins_1m", title: "먹방 재벌", desc: "누적 코인 100만 획득", icon: "💰", check: (g) => g.stats.totalCoinsEarned >= 1000000 }
];

// --- Main Game Engine ---
class JinwooGame {
  constructor() {
    this.level = 1;
    this.weight = 55.0; // kg
    this.exp = 0;
    this.reqExp = 30;
    this.coins = 1000; // Starter coins (Generous starting fund!)
    this.autoCps = 0; // Calories per second
    
    this.combo = 0;
    this.comboTimer = null;
    this.lastDialogueTime = 0;

    // Upgrades and states
    this.autoFeeders = JSON.parse(JSON.stringify(AUTO_FEEDERS));
    this.stomachUpgrades = JSON.parse(JSON.stringify(STOMACH_UPGRADES));
    this.costumes = JSON.parse(JSON.stringify(COSTUMES));
    this.equippedCostume = "default";
    this.unlockedAchievements = [];

    // Camera zoom
    this.userZoom = 1.0;
    this.autoZoomFactor = 1.0;

    // Statistics tracking
    this.stats = {
      totalFoodEaten: 0,
      totalClicks: 0,
      totalCalConsumed: 0,
      totalCoinsEarned: 1000,
      playTimeSeconds: 0,
      maxStageReached: "1단계: 거북선류 수련생 손예훈"
    };

    // User settings
    this.settings = {
      sfx: true,
      particles: true,
      floatingText: true
    };

    // Subsystems
    this.char = null;
    this.particles = null;

    // Timers
    this.gameLoopTimer = null;
    this.autoSaveTimer = null;

    this.init();
  }

  init() {
    // 1. Initialize Character
    this.char = new JinwooCharacter("jinwoo-svg-container");

    // 2. Initialize Particle Canvas
    this.initParticleCanvas();

    // 3. Load Save Data or First Run
    this.loadGame();

    // Ensure stage background and visual data are synchronized
    const currentStage = getStageData(this.level);
    this.reqExp = currentStage.reqExp;
    this.updateStageBackground(currentStage);
    const initialRatio = this.reqExp > 0 ? (this.exp / this.reqExp) : 0;
    this.char.setGrowthStage(this.level, this.weight, initialRatio);
    this.char.setCostume(this.equippedCostume);
    this.updateAutoCamera();

    // 4. Bind DOM Events
    this.bindEvents();

    // 5. Render UI
    this.renderFoodList();
    this.renderAutoList();
    this.renderUpgradeList();
    this.renderCostumeList();
    this.renderAchievementsList();
    this.updateStatsUI();
    this.updateCameraTransform();

    // 6. Start Loops
    this.startGameLoop();
    this.startAutoSave();

    // 7. Check Offline Progress
    this.checkOfflineRewards();
  }

  // --- Main Tick Game Loop (Runs 10 times per second for smooth state) ---
  startGameLoop() {
    let lastTime = performance.now();
    this.gameLoopTimer = setInterval(() => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Update Playtime
      this.stats.playTimeSeconds += dt;

      // Calculate Cal/s
      this.recalculateCps();

      if (this.autoCps > 0) {
        const calGain = this.autoCps * dt;
        const coinGain = (this.autoCps * 1.0) * dt; // 100% of autoCps converted to coins!
        this.addCalories(calGain, false);
        this.addCoins(coinGain);
      }

      // Random Jinwoo Chatter every ~12 seconds
      if (now - this.lastDialogueTime > 12000 && Math.random() < 0.25) {
        this.triggerRandomDialogue();
      }

      // Check Achievements
      this.checkAchievements();
    }, 100);
  }

  recalculateCps() {
    let base = 0;
    for (const af of this.autoFeeders) {
      base += af.baseCps * af.count;
    }

    // Multiply by stomach upgrade global mult
    const gutUp = this.stomachUpgrades.find(u => u.id === "blackhole_gut");
    const mult = gutUp ? Math.pow(gutUp.globalMult, gutUp.level) : 1;

    // Costume bonuses
    let costumeMult = 1;
    if (this.equippedCostume === "crown") costumeMult += 0.2;

    this.autoCps = base * mult * costumeMult;
    document.getElementById("stat-cps").textContent = `+${formatNumber(this.autoCps)} Cal/초`;
  }

  // --- Add Calories & Weight Growth (NO AUTOMATIC LEVEL UP) ---
  addCalories(amount, isManualClick = false, clientPos = null) {
    if (amount <= 0) return;
    if (this.level >= 10000) {
      this.level = 10000;
      this.exp = this.reqExp;
      this.updateStatsUI();
      return;
    }

    // Calculate critical hits
    let isCrit = false;
    let finalAmount = amount;

    if (isManualClick) {
      const goldStomach = this.stomachUpgrades.find(u => u.id === "gold_stomach");
      let critChance = 0.05 + (goldStomach ? goldStomach.level * goldStomach.critBonus : 0);
      if (this.equippedCostume === "gold") critChance += 0.1;

      if (Math.random() < critChance) {
        isCrit = true;
        finalAmount *= 5.0; // 500% Huge Bite!
      }
    }

    this.exp += finalAmount;
    this.stats.totalCalConsumed += finalAmount;

    // Weight increases proportionally (1 kg per ~1,500 Cal base, with diminishing log curve)
    const weightGain = (finalAmount / 1500) * (1 + Math.log10(Math.max(1, this.level)) * 0.1);
    this.weight += weightGain;

    // Visual Floating text & Sound
    if (isManualClick && this.settings.floatingText && clientPos) {
      this.showFloatingText(`+${formatNumber(finalAmount)} Cal`, clientPos.x, clientPos.y, isCrit ? "crit" : "");
    }

    // Automatic Level Up Trigger - No button press required!
    if (this.exp >= this.reqExp && this.level < 10000) {
      this.triggerAutoLevelUp();
    } else {
      this.updateStatsUI();
      const expRatio = this.reqExp > 0 ? Math.min(1, this.exp / this.reqExp) : 0;
      this.char.setGrowthStage(this.level, this.weight, expRatio);
      this.updateAutoCamera();
    }
  }

  // --- Automatic Level Up System (Levels up instantly when Exp is full) ---
  triggerAutoLevelUp() {
    if (this.exp < this.reqExp || this.level >= 10000) return;

    const prevLevel = this.level;
    const prevTier = getAnimeTierIndex(this.level);
    let levelsGained = 0;

    // Level up ready levels in smooth chunks (up to 50 at once)
    let maxBatch = 50;
    while (this.exp >= this.reqExp && this.level < 10000 && maxBatch > 0) {
      this.exp -= this.reqExp;
      this.level++;
      this.reqExp = calculateReqExp(this.level);
      levelsGained++;
      maxBatch--;
    }

    if (this.level >= 10000) {
      this.level = 10000;
      this.exp = this.reqExp;
    }

    // Huge Coin Rewards on Level Up!
    const coinReward = Math.floor(levelsGained * (1000 + this.level * 250));
    this.addCoins(coinReward);

    const newTier = getAnimeTierIndex(this.level);
    const stageData = getStageData(this.level);
    this.stats.maxStageReached = stageData.title;

    window.soundEngine.playLevelUp();

    const mouthPos = this.getMouthCenter();
    this.showFloatingText(`🎉 Lv.${this.level} 돌파! (+${formatNumber(coinReward)} 🪙)`, mouthPos.x, mouthPos.y - 40, "level-up");

    // ONLY trigger full screen shake & evolution modal when entering a NEW ANIME TIER!
    if (newTier > prevTier) {
      window.soundEngine.playEvolution();
      this.triggerScreenShake();
      this.createConfettiExplosion();
      this.updateStageBackground(stageData);
      this.showEvolutionModal(stageData);
    }

    // Update UI and Character
    const expRatio = this.reqExp > 0 ? Math.min(1, this.exp / this.reqExp) : 0;
    this.char.setGrowthStage(this.level, this.weight, expRatio);
    this.updateStatsUI();
    this.renderFoodList();
    this.renderCostumeList();
    this.updateAutoCamera();
  }

  manualLevelUp() {
    this.triggerAutoLevelUp();
  }

  calculateReadyLevels() {
    let tempExp = this.exp;
    let tempLevel = this.level;
    let count = 0;
    while (tempLevel < 10000) {
      const needed = calculateReqExp(tempLevel);
      if (tempExp >= needed) {
        tempExp -= needed;
        tempLevel++;
        count++;
      } else {
        break;
      }
    }
    return Math.max(1, count);
  }

  addCoins(amount) {
    if (amount <= 0) return;
    this.coins += amount;
    this.stats.totalCoinsEarned += amount;
    document.getElementById("stat-coins").textContent = formatNumber(this.coins);
  }

  updateStageBackground(stageData) {
    const bgElem = document.getElementById("stage-bg");
    bgElem.className = stageData.bgClass;

    document.getElementById("stage-icon").textContent = stageData.icon;
    document.getElementById("stage-title").textContent = stageData.title;
    document.getElementById("stage-sub").textContent = `현재 장소: ${stageData.sub}`;

    // Add aura if high level
    const aura = document.getElementById("jinwoo-aura");
    if (this.level >= 6) {
      aura.classList.add("aura-active");
    } else {
      aura.classList.remove("aura-active");
    }
  }

  showEvolutionModal(stageData) {
    const modal = document.getElementById("evolution-modal");
    document.getElementById("evo-title").textContent = stageData.title;
    document.getElementById("evo-message").textContent = `"${stageData.message}"`;

    // Clone character preview
    const preview = document.getElementById("evo-avatar-preview");
    preview.innerHTML = document.getElementById("jinwoo-svg-container").innerHTML;

    modal.classList.remove("hidden");
  }

  // --- Food Interaction (Click or Drag & Drop) ---
  feedFood(foodId, clientPos = null) {
    const food = FOOD_CATALOG.find(f => f.id === foodId);
    if (!food) return;

    if (this.level < food.unlockLevel) {
      this.showBubble("아직 레벨이 부족해서 씹을 수 없어!");
      return;
    }

    if (food.cost > 0 && this.coins < food.cost) {
      this.showBubble("코인이 부족해! 배를 찌르거나 알바를 늘려줘!");
      window.soundEngine.playBite();
      return;
    }

    // Deduct coins if cost > 0
    if (food.cost > 0) {
      this.coins -= food.cost;
      document.getElementById("stat-coins").textContent = formatNumber(this.coins);
    }

    // Stats
    this.stats.totalFoodEaten++;
    this.stats.totalClicks++;

    // Calculate Bite Power (Jaw Strength upgrade)
    const jawUpgrade = this.stomachUpgrades.find(u => u.id === "jaw_strength");
    const jawMult = jawUpgrade ? Math.pow(jawUpgrade.mult, jawUpgrade.level - 1) : 1;

    let calGain = food.baseCal * jawMult;
    
    // Reward Coins on eating (Generous 1.5x Calorie value directly as pure gold coins!)
    const coinReward = Math.max(100, Math.floor(food.baseCal * 1.5));
    this.addCoins(coinReward);

    // Combo System
    this.incrementCombo();

    // Trigger Character Eating & Muscle Pump Motion
    this.char.triggerChew();

    // Sound
    window.soundEngine.playBite();
    if (Math.random() < 0.22) {
      setTimeout(() => window.soundEngine.playGulp(), 150);
    }
    // Occasional giant burp
    if (Math.random() < 0.08) {
      setTimeout(() => {
        this.char.triggerBurp();
        window.soundEngine.playBurp();
        this.showBubble("끄으으억~~! 근성장 폭발한다!");
      }, 350);
    }

    // Particle crumbs
    const pos = clientPos || this.getMouthCenter();
    this.createFoodCrumbs(pos.x, pos.y, food.icon);

    // Add Calories
    this.addCalories(calGain, true, pos);

    // Bounce button effect
    const charElem = document.getElementById("jinwoo-character");
    charElem.classList.remove("jinwoo-eating");
    void charElem.offsetWidth; // trigger reflow
    charElem.classList.add("jinwoo-eating");
  }

  // --- Tap Jinwoo Body / Abs Interaction ---
  tapJinwoo(e) {
    this.stats.totalClicks++;

    // Sound
    window.soundEngine.playBoing();

    // Trigger Muscle Pumping
    this.char.triggerPump();

    // Jelly bounce animation
    const charElem = document.getElementById("jinwoo-character");
    charElem.classList.remove("jinwoo-jelly");
    void charElem.offsetWidth;
    charElem.classList.add("jinwoo-jelly");

    // Spring belly upgrade bonus
    const springUp = this.stomachUpgrades.find(u => u.id === "jelly_belly");
    const mult = springUp ? Math.pow(springUp.tapMult, springUp.level) : 1;

    // Super Generous Tap Calories & Coins for instant, satisfying growth!
    const baseTapCal = Math.max(100, Math.floor(this.level * 150 * mult));
    const baseTapCoin = Math.max(50, Math.floor(this.level * 80 * mult));

    const pos = { x: e.clientX, y: e.clientY };
    this.addCalories(baseTapCal, true, pos);
    this.addCoins(baseTapCoin);

    if (this.settings.floatingText) {
      this.showFloatingText(`+${baseTapCoin} 🪙`, pos.x + 20, pos.y - 15, "coin");
    }

    // Gigachad reaction lines
    if (Math.random() < 0.35) {
      const msgs = [
        "이게 바로 강철 복근이다!",
        "더 때려봐! 갑빠 펌핑된다!",
        "3대 500은 가볍게 넘었지.",
        "단백질이 온몸을 휘감는다!",
        "내 대흉근은 방탄유리보다 단단해!"
      ];
      this.showBubble(msgs[Math.floor(Math.random() * msgs.length)]);
    }
  }

  // --- Combo System ---
  incrementCombo() {
    this.combo++;
    const comboBox = document.getElementById("combo-box");
    const comboText = document.getElementById("combo-text");

    if (this.combo >= 3) {
      comboBox.classList.remove("hidden");
      comboText.textContent = `${this.combo} COMBO!`;
      if (this.combo % 5 === 0) {
        window.soundEngine.playCombo(this.combo);
      }
    }

    if (this.comboTimer) clearTimeout(this.comboTimer);
    this.comboTimer = setTimeout(() => {
      this.combo = 0;
      comboBox.classList.add("hidden");
    }, 2200);
  }

  // --- Speech Bubble Helper ---
  showBubble(text, duration = 3000) {
    const bubble = document.getElementById("speech-bubble");
    const bubbleText = document.getElementById("speech-text");
    bubbleText.textContent = text;
    bubble.classList.remove("hidden");

    this.lastDialogueTime = performance.now();

    if (this.bubbleTimer) clearTimeout(this.bubbleTimer);
    this.bubbleTimer = setTimeout(() => {
      bubble.classList.add("hidden");
    }, duration);
  }

  triggerRandomDialogue() {
    const text = JINWOO_DIALOGUES[Math.floor(Math.random() * JINWOO_DIALOGUES.length)];
    this.showBubble(text);
  }

  getMouthCenter() {
    const stage = document.getElementById("character-stage");
    const rect = stage.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height * 0.34
    };
  }

  // --- Dragon Ball Transformation Scaling (Balanced & Elegant) ---
  updateAutoCamera() {
    const expRatio = this.reqExp > 0 ? (this.exp / this.reqExp) : 0;
    const growthLevel = (this.level - 1) + expRatio;
    // Perfectly controlled anime scaling so character fits nicely on screen
    const baseScale = 1.0 + Math.min(0.35, Math.pow(growthLevel, 0.45) * 0.04);
    this.autoZoomFactor = baseScale;
    this.updateCameraTransform();
  }

  updateCameraTransform() {
    const totalScale = this.userZoom * this.autoZoomFactor;
    const wrapper = document.getElementById("jinwoo-wrapper");
    wrapper.style.transform = `scale(${totalScale})`;

    const shadow = document.getElementById("jinwoo-shadow");
    shadow.style.transform = `scale(${totalScale * 1.15})`;

    document.getElementById("zoom-level-text").textContent = `${Math.round(totalScale * 100)}%`;
  }

  // --- Screen Shake & Floating Texts ---
  triggerScreenShake() {
    const app = document.getElementById("game-app");
    app.classList.remove("screen-shake");
    void app.offsetWidth;
    app.classList.add("screen-shake");
  }

  showFloatingText(text, x, y, extraClass = "") {
    const container = document.getElementById("floating-text-container");
    const el = document.createElement("div");
    el.className = `floating-text ${extraClass}`;
    el.textContent = text;
    
    // Position within container
    const stageRect = document.getElementById("character-stage").getBoundingClientRect();
    const relX = x - stageRect.left;
    const relY = y - stageRect.top;

    el.style.left = `${relX}px`;
    el.style.top = `${relY}px`;

    container.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 850);
  }

  // --- Particle Engine (HTML5 Canvas 60fps) ---
  initParticleCanvas() {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    this.particles = [];

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity || 0.2;
        p.rotation += p.vRot || 0;
        p.life -= p.decay;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "emoji") {
          ctx.font = `${p.size}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.char, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
      }

      requestAnimationFrame(render);
    };
    render();
  }

  createFoodCrumbs(x, y, emoji) {
    if (!this.settings.particles) return;
    const canvas = document.getElementById("particle-canvas");
    const rect = canvas.getBoundingClientRect();
    const rx = x - rect.left;
    const ry = y - rect.top;

    // Small crumb dots
    for (let i = 0; i < 7; i++) {
      this.particles.push({
        x: rx,
        y: ry,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 5 - 2,
        gravity: 0.35,
        size: 5 + Math.random() * 6,
        color: ["#ff9800", "#ffeb3b", "#d7ccc8", "#ff5722"][Math.floor(Math.random() * 4)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.2,
        life: 1.0,
        decay: 0.035,
        type: "rect"
      });
    }
  }

  createConfettiExplosion() {
    if (!this.settings.particles) return;
    const canvas = document.getElementById("particle-canvas");
    const cx = canvas.width / 2;
    const cy = canvas.height * 0.35;

    const colors = ["#ff1744", "#00e676", "#ffea00", "#00e5ff", "#e040fb", "#ff9100"];

    for (let i = 0; i < 65; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        gravity: 0.28,
        size: 7 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.3,
        life: 1.0,
        decay: 0.015,
        type: "rect"
      });
    }
  }

  // --- UI Renders ---
  updateStatsUI() {
    // Level & Weight
    document.getElementById("stat-level").textContent = this.level;
    const w = formatWeight(this.weight);
    document.getElementById("stat-weight").textContent = w.val;
    document.getElementById("stat-weight-unit").textContent = w.unit;

    // Exp Bar
    const pct = Math.min(100, Math.max(0, (this.exp / this.reqExp) * 100));
    document.getElementById("exp-bar-fill").style.width = `${pct}%`;
    document.getElementById("exp-text").textContent = `${formatNumber(this.exp)} / ${formatNumber(this.reqExp)} Cal (${pct.toFixed(1)}%)`;

    // Manual Level Up Button & Ready Glow
    const btnLvl = document.getElementById("btn-manual-levelup");
    const expWrap = document.getElementById("exp-bar-wrap");
    if (btnLvl) {
      if (this.exp >= this.reqExp && this.level < 10000) {
        const readyLevels = this.calculateReadyLevels();
        btnLvl.classList.remove("hidden");
        const btnText = document.getElementById("btn-levelup-text");
        if (btnText) {
          btnText.textContent = readyLevels > 1 
            ? `✨ 레벨업! (+${readyLevels})` 
            : `✨ 레벨업!`;
        }
        if (expWrap) expWrap.classList.add("exp-ready");
      } else {
        btnLvl.classList.add("hidden");
        if (expWrap) expWrap.classList.remove("exp-ready");
      }
    }

    // Coins & Cal/s
    document.getElementById("stat-coins").textContent = formatNumber(this.coins);
    document.getElementById("stat-cps").textContent = `+${formatNumber(this.autoCps)} Cal/초`;
  }

  renderFoodList() {
    const list = document.getElementById("food-list");
    list.innerHTML = "";

    FOOD_CATALOG.forEach(food => {
      const isLocked = this.level < food.unlockLevel;
      const card = document.createElement("div");
      card.className = `food-card ${isLocked ? "locked" : ""} ${food.cost === 0 ? "free-food" : ""}`;
      card.dataset.foodId = food.id;

      card.innerHTML = `
        <div class="food-icon-wrap">${food.icon}</div>
        <div class="food-name">${food.name}</div>
        <div class="food-cal">+${formatNumber(food.baseCal)} Cal</div>
        ${
          isLocked
            ? `<div class="food-locked-tag">🔒 Lv.${food.unlockLevel} 해금</div>`
            : `<button class="food-buy-btn" data-food="${food.id}">
                ${food.cost === 0 ? "무한 공짜 냠!" : `${formatNumber(food.cost)} 🪙 먹기`}
               </button>`
        }
      `;

      if (!isLocked) {
        // Direct click to feed
        card.addEventListener("click", (e) => {
          this.feedFood(food.id, { x: e.clientX, y: e.clientY });
        });

        // Drag to feed
        this.attachFoodDragEvents(card, food);
      }

      list.appendChild(card);
    });
  }

  renderAutoList() {
    const list = document.getElementById("auto-feeder-list");
    list.innerHTML = "";

    this.autoFeeders.forEach((af, idx) => {
      const currentCost = Math.floor(af.baseCost * Math.pow(1.18, af.count));
      const canAfford = this.coins >= currentCost;

      const card = document.createElement("div");
      card.className = "upgrade-card";
      card.innerHTML = `
        <div class="upgrade-left">
          <div class="upgrade-icon">${af.icon}</div>
          <div class="upgrade-details">
            <div class="upgrade-title-row">
              <span class="upgrade-name">${af.name}</span>
              <span class="upgrade-count">${af.count}명</span>
            </div>
            <span class="upgrade-desc">${af.desc}</span>
            <span class="upgrade-rate">+${formatNumber(af.baseCps * (af.count + 1))} Cal/초 (누적: +${formatNumber(af.baseCps * af.count)}/초)</span>
          </div>
        </div>
        <button class="upgrade-buy-btn" id="btn-buy-auto-${af.id}" ${canAfford ? "" : "disabled"}>
          <span class="upgrade-btn-cost">${formatNumber(currentCost)} 🪙</span>
          <span class="upgrade-btn-label">고용하기</span>
        </button>
      `;

      card.querySelector(".upgrade-buy-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.buyAutoFeeder(idx);
      });

      list.appendChild(card);
    });
  }

  buyAutoFeeder(index) {
    const af = this.autoFeeders[index];
    const cost = Math.floor(af.baseCost * Math.pow(1.18, af.count));

    if (this.coins < cost) return;

    this.coins -= cost;
    af.count++;
    window.soundEngine.playUpgrade();
    this.recalculateCps();
    this.updateStatsUI();
    this.renderAutoList();
  }

  renderUpgradeList() {
    const list = document.getElementById("stomach-upgrade-list");
    list.innerHTML = "";

    this.stomachUpgrades.forEach((up, idx) => {
      const currentCost = Math.floor(up.baseCost * Math.pow(1.85, up.level));
      const canAfford = this.coins >= currentCost;

      const card = document.createElement("div");
      card.className = "upgrade-card";
      card.innerHTML = `
        <div class="upgrade-left">
          <div class="upgrade-icon">${up.icon}</div>
          <div class="upgrade-details">
            <div class="upgrade-title-row">
              <span class="upgrade-name">${up.name}</span>
              <span class="upgrade-count">Lv.${up.level}</span>
            </div>
            <span class="upgrade-desc">${up.desc}</span>
          </div>
        </div>
        <button class="upgrade-buy-btn" id="btn-buy-stomach-${up.id}" ${canAfford ? "" : "disabled"}>
          <span class="upgrade-btn-cost">${formatNumber(currentCost)} 🪙</span>
          <span class="upgrade-btn-label">단련하기</span>
        </button>
      `;

      card.querySelector(".upgrade-buy-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.buyStomachUpgrade(idx);
      });

      list.appendChild(card);
    });
  }

  buyStomachUpgrade(index) {
    const up = this.stomachUpgrades[index];
    const cost = Math.floor(up.baseCost * Math.pow(1.85, up.level));

    if (this.coins < cost) return;

    this.coins -= cost;
    up.level++;
    window.soundEngine.playUpgrade();
    this.recalculateCps();
    this.updateStatsUI();
    this.renderUpgradeList();
  }

  renderCostumeList() {
    const list = document.getElementById("costume-list");
    list.innerHTML = "";

    this.costumes.forEach(cos => {
      const isLocked = this.level < cos.reqLevel;
      const isEquipped = this.equippedCostume === cos.id;

      const card = document.createElement("div");
      card.className = `costume-card ${isEquipped ? "equipped" : ""} ${isLocked ? "locked" : ""}`;
      card.innerHTML = `
        <div class="costume-icon">${cos.icon}</div>
        <div class="costume-name">${cos.name}</div>
        <div class="costume-effect">${cos.desc}</div>
        ${
          isLocked
            ? `<div class="food-locked-tag">🔒 Lv.${cos.reqLevel} 해금</div>`
            : `<button class="costume-status-btn">${isEquipped ? "착용 중 ✨" : "입히기"}</button>`
        }
      `;

      if (!isLocked) {
        card.addEventListener("click", () => {
          this.equipCostume(cos.id);
        });
      }

      list.appendChild(card);
    });
  }

  equipCostume(costumeId) {
    this.equippedCostume = costumeId;
    this.char.setCostume(costumeId);
    window.soundEngine.playCoin();
    this.renderCostumeList();
    this.recalculateCps();
    this.showBubble("새 옷 입으니까 배가 더 잘 들어가는 느낌이야!");
  }

  renderAchievementsList() {
    const list = document.getElementById("achievements-list");
    list.innerHTML = "";

    ACHIEVEMENTS.forEach(ach => {
      const done = this.unlockedAchievements.includes(ach.id);
      const card = document.createElement("div");
      card.className = `achieve-card ${done ? "completed" : ""}`;
      card.innerHTML = `
        <div class="achieve-icon">${done ? ach.icon : "🔒"}</div>
        <div class="achieve-info">
          <div class="achieve-title">${ach.title}</div>
          <div class="achieve-desc">${ach.desc}</div>
        </div>
        <div class="achieve-badge">${done ? "달성 완료! 🌟" : "진행 중"}</div>
      `;
      list.appendChild(card);
    });
  }

  checkAchievements() {
    ACHIEVEMENTS.forEach(ach => {
      if (!this.unlockedAchievements.includes(ach.id) && ach.check(this)) {
        this.unlockedAchievements.push(ach.id);
        this.showAchievementBanner(ach);
        this.renderAchievementsList();
      }
    });
  }

  showAchievementBanner(ach) {
    window.soundEngine.playEvolution();
    this.showBubble(`🏆 업적 달성: [${ach.title}]!`, 4000);
  }

  // --- Drag and Drop Food Feeding System (Seamless, No distracting red circles) ---
  attachFoodDragEvents(cardElem, food) {
    const ghost = document.getElementById("drag-ghost");

    let isDragging = false;
    let startX = 0, startY = 0;

    const onPointerDown = (e) => {
      if (e.target.closest(".food-buy-btn")) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      ghost.textContent = food.icon;
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
      ghost.classList.remove("hidden");

      // Character prepares to eat!
      this.char.setState("chewing", 0);

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      ghost.style.left = `${e.clientX}px`;
      ghost.style.top = `${e.clientY}px`;
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;

      ghost.classList.add("hidden");

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      // Check if dropped near character or stage
      const mouth = this.getMouthCenter();
      const dist = Math.hypot(e.clientX - mouth.x, e.clientY - mouth.y);

      if (dist < 200 || Math.hypot(e.clientX - startX, e.clientY - startY) > 50) {
        // Feed into Yehoon!
        this.feedFood(food.id, { x: mouth.x, y: mouth.y });
      } else {
        this.char.setState("idle", 0);
      }
    };

    cardElem.addEventListener("pointerdown", onPointerDown);
  }

  // --- Bind Global Events ---
  bindEvents() {
    // 1. Belly tap
    const hitbox = document.getElementById("character-tap-hitbox");
    hitbox.addEventListener("pointerdown", (e) => {
      this.tapJinwoo(e);
    });

    // 2. Camera zoom controls
    document.getElementById("btn-zoom-in").addEventListener("click", () => {
      this.userZoom = Math.min(2.0, this.userZoom + 0.15);
      this.updateCameraTransform();
    });
    document.getElementById("btn-zoom-out").addEventListener("click", () => {
      this.userZoom = Math.max(0.4, this.userZoom - 0.15);
      this.updateCameraTransform();
    });
    document.getElementById("btn-zoom-reset").addEventListener("click", () => {
      this.userZoom = 1.0;
      this.updateAutoCamera();
    });

    // 3. Sound toggle button
    const btnSound = document.getElementById("btn-sound");
    btnSound.addEventListener("click", () => {
      this.settings.sfx = !this.settings.sfx;
      window.soundEngine.setEnabled(this.settings.sfx);
      document.getElementById("sound-icon").textContent = this.settings.sfx ? "🔊" : "🔇";
      document.getElementById("chk-sfx").checked = this.settings.sfx;
    });

    // 4. Modal toggles (Enhanced Reliable Click & Pointerdown)
    const openStats = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      this.openStatsModal();
    };
    const openSettings = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      document.getElementById("settings-modal").classList.remove("hidden");
    };

    const btnStats = document.getElementById("btn-stats");
    if (btnStats) {
      btnStats.addEventListener("click", openStats);
      btnStats.addEventListener("pointerdown", openStats);
    }

    const btnSettings = document.getElementById("btn-settings");
    if (btnSettings) {
      btnSettings.addEventListener("click", openSettings);
      btnSettings.addEventListener("pointerdown", openSettings);
    }

    // Manual Level Up button
    const btnLevelup = document.getElementById("btn-manual-levelup");
    if (btnLevelup) {
      const doLevelUp = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        this.manualLevelUp();
      };
      btnLevelup.addEventListener("click", doLevelUp);
      btnLevelup.addEventListener("pointerdown", doLevelUp);
    }

    document.getElementById("btn-evo-confirm").addEventListener("click", () => {
      document.getElementById("evolution-modal").classList.add("hidden");
    });
    document.getElementById("btn-offline-claim").addEventListener("click", () => {
      document.getElementById("offline-modal").classList.add("hidden");
    });

    // Close when clicking directly on modal background
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });

    // Generic modal close buttons
    document.querySelectorAll(".btn-close-modal").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const targetId = btn.dataset.close;
        if (targetId) document.getElementById(targetId).classList.add("hidden");
      });
    });

    // Sub tabs in stats modal
    document.querySelectorAll(".sub-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".sub-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".sub-tab-content").forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.subtab).classList.add("active");
      });
    });

    // 5. Bottom Deck Tab switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const pane = document.getElementById(btn.dataset.tab);
        if (pane) pane.classList.add("active");
      });
    });

    // 6. Settings controls
    document.getElementById("chk-sfx").addEventListener("change", (e) => {
      this.settings.sfx = e.target.checked;
      window.soundEngine.setEnabled(this.settings.sfx);
      document.getElementById("sound-icon").textContent = this.settings.sfx ? "🔊" : "🔇";
    });
    document.getElementById("chk-particles").addEventListener("change", (e) => {
      this.settings.particles = e.target.checked;
    });
    document.getElementById("chk-floating").addEventListener("change", (e) => {
      this.settings.floatingText = e.target.checked;
    });

    // Manual Save & Reset buttons
    document.getElementById("btn-save-manual").addEventListener("click", () => {
      this.saveGame();
      const notice = document.getElementById("save-notice-text");
      notice.textContent = "✅ 게임이 성공적으로 저장되었습니다!";
      setTimeout(() => notice.textContent = "10초마다 자동 저장됩니다.", 2500);
    });

    document.getElementById("btn-reset-game").addEventListener("click", () => {
      document.getElementById("settings-modal").classList.add("hidden");
      document.getElementById("reset-confirm-modal").classList.remove("hidden");
    });
    document.getElementById("btn-reset-cancel").addEventListener("click", () => {
      document.getElementById("reset-confirm-modal").classList.add("hidden");
    });
    document.getElementById("btn-reset-final").addEventListener("click", () => {
      this.resetGame();
    });

    // Periodic check to update buy button disabled states
    setInterval(() => {
      this.refreshButtonStates();
    }, 400);
  }

  refreshButtonStates() {
    this.autoFeeders.forEach(af => {
      const cost = Math.floor(af.baseCost * Math.pow(1.18, af.count));
      const btn = document.getElementById(`btn-buy-auto-${af.id}`);
      if (btn) btn.disabled = this.coins < cost;
    });

    this.stomachUpgrades.forEach(up => {
      const cost = Math.floor(up.baseCost * Math.pow(1.85, up.level));
      const btn = document.getElementById(`btn-buy-stomach-${up.id}`);
      if (btn) btn.disabled = this.coins < cost;
    });
  }

  openStatsModal() {
    document.getElementById("rec-total-food").textContent = `${formatNumber(this.stats.totalFoodEaten)}개`;
    document.getElementById("rec-total-clicks").textContent = `${formatNumber(this.stats.totalClicks)}회`;
    document.getElementById("rec-total-cal").textContent = `${formatNumber(this.stats.totalCalConsumed)} Cal`;
    document.getElementById("rec-total-coins").textContent = `${formatNumber(this.stats.totalCoinsEarned)} 🪙`;

    const mins = Math.floor(this.stats.playTimeSeconds / 60);
    const secs = Math.floor(this.stats.playTimeSeconds % 60);
    document.getElementById("rec-playtime").textContent = `${mins}분 ${secs}초`;
    document.getElementById("rec-max-stage").textContent = this.stats.maxStageReached;

    this.renderAchievementsList();
    document.getElementById("stats-modal").classList.remove("hidden");
  }

  // --- Offline Progression Calculation ---
  checkOfflineRewards() {
    const lastTimeStr = localStorage.getItem("jinwoo_last_timestamp");
    if (!lastTimeStr) return;

    const lastTime = parseInt(lastTimeStr, 10);
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastTime) / 1000);

    // Minimum 30 seconds away to trigger reward
    if (elapsedSeconds >= 30 && this.autoCps > 0) {
      // Cap at 12 hours (43200 seconds)
      const cappedSeconds = Math.min(43200, elapsedSeconds);
      const offlineCal = Math.floor(this.autoCps * cappedSeconds * 0.7); // 70% efficiency when asleep
      const offlineCoins = Math.floor((this.autoCps * 0.12) * cappedSeconds * 0.7);

      this.addCalories(offlineCal, false);
      this.addCoins(offlineCoins);

      const mins = Math.floor(cappedSeconds / 60);
      const secs = cappedSeconds % 60;
      document.getElementById("offline-time-text").textContent = `자리 비운 시간: ${mins}분 ${secs}초`;
      document.getElementById("offline-cal-val").textContent = `+${formatNumber(offlineCal)} Cal`;
      document.getElementById("offline-coin-val").textContent = `+${formatNumber(offlineCoins)} 🪙`;

      document.getElementById("offline-modal").classList.remove("hidden");
    }
  }

  // --- Save / Load / Reset System ---
  startAutoSave() {
    this.autoSaveTimer = setInterval(() => {
      this.saveGame();
    }, 10000); // Save every 10 seconds
  }

  saveGame() {
    const saveData = {
      level: this.level,
      weight: this.weight,
      exp: this.exp,
      coins: this.coins,
      autoFeeders: this.autoFeeders,
      stomachUpgrades: this.stomachUpgrades,
      equippedCostume: this.equippedCostume,
      unlockedAchievements: this.unlockedAchievements,
      stats: this.stats,
      settings: this.settings,
      timestamp: Date.now()
    };

    localStorage.setItem("jinwoo_save_data_v1", JSON.stringify(saveData));
    localStorage.setItem("jinwoo_last_timestamp", Date.now().toString());
  }

  loadGame() {
    const raw = localStorage.getItem("jinwoo_save_data_v1");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      if (data.level) this.level = Math.min(10000, data.level);
      if (data.weight) this.weight = data.weight;
      if (data.exp !== undefined) this.exp = data.exp;
      if (data.coins !== undefined) this.coins = data.coins;
      if (data.autoFeeders) this.autoFeeders = data.autoFeeders;
      if (data.stomachUpgrades) this.stomachUpgrades = data.stomachUpgrades;
      if (data.equippedCostume) this.equippedCostume = data.equippedCostume;
      if (data.unlockedAchievements) this.unlockedAchievements = data.unlockedAchievements;
      if (data.stats) this.stats = { ...this.stats, ...data.stats };
      if (data.settings) {
        this.settings = { ...this.settings, ...data.settings };
        window.soundEngine.setEnabled(this.settings.sfx);
        document.getElementById("chk-sfx").checked = this.settings.sfx;
        document.getElementById("chk-particles").checked = this.settings.particles;
        document.getElementById("chk-floating").checked = this.settings.floatingText;
        document.getElementById("sound-icon").textContent = this.settings.sfx ? "🔊" : "🔇";
      }

      const stage = getStageData(this.level);
      this.reqExp = stage.reqExp;
      // Cap stored exp so it doesn't trigger endless level-ups on start
      if (this.exp >= this.reqExp && this.level < 10000) {
        this.exp = Math.min(this.exp, this.reqExp - 1);
      }
      this.updateStageBackground(stage);
      const expRatio = this.reqExp > 0 ? (this.exp / this.reqExp) : 0;
      this.char.setGrowthStage(this.level, this.weight, expRatio);
      this.char.setCostume(this.equippedCostume);
      this.updateAutoCamera();
    } catch (e) {
      console.warn("Could not load save file", e);
    }
  }

  resetGame() {
    localStorage.removeItem("jinwoo_save_data_v1");
    localStorage.removeItem("jinwoo_last_timestamp");
    location.reload();
  }
}

// Start Game on Window Load
window.addEventListener("DOMContentLoaded", () => {
  window.jinwooGame = new JinwooGame();
});
