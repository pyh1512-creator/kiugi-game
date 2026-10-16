/**
 * Feed & Grow Yehoon - 10,000 Level Multi-Anime Crossover Evolution Engine
 * References iconic legendary anime up to Lv. 10000:
 * - Dragon Ball (손오공/초사이어인/무의식의 극의)
 * - Naruto (나루토 구미 차크라 모드 & 닌자 서클릿)
 * - Bleach (이치고 만해 천쇄참월 & 호로화 사패장)
 * - One Piece (루피 태양의 신 니카 기어 5 & 해방의 드럼)
 * - Demon Slayer (탄지로 해의 호흡 히노카미 카구라 & 반점)
 * - Jujutsu Kaisen (스쿠나 저주의 문신 & 복마어주자)
 * - Solo Leveling (그림자 군주 성예훈 & 보랏빛 안광 & 일어나라)
 * - Hunter x Hunter (곤육몬 제약과 서약 거대 칠흑 기둥 헤어)
 * - Fate Series (영웅왕 길가메쉬 황금 갑주 & 게이트 오브 바빌론)
 * - One Punch Man (사이타마 노란 슈트 & 진심 펀치 충격파)
 * - Evangelion (초호기 각성 유사신화 & AT 필드 & 천사 링)
 * - Gurren Lagann (초천원돌파 나선신 & 나선력 드릴 & 가슴 선글라스)
 * - Lv.10000 MAX: 전지전능 애니메 절대신 박예훈 (True Anime Godhead)
 */

class JinwooCharacter {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.state = "idle";
    this.growthStage = 1;
    this.weight = 55.0;
    this.expProgress = 0;
    this.costume = "default";
    this.animationTimer = null;
    this.kiCharging = false;

    this.init();
  }

  init() {
    this.render();
  }

  setGrowthStage(stage, weight, expProgress = 0) {
    this.growthStage = stage;
    this.weight = weight;
    this.expProgress = Math.min(1, Math.max(0, expProgress));
    this.render();
  }

  setCostume(costumeId) {
    this.costume = costumeId;
    this.render();
  }

  setState(stateName, duration = 350) {
    this.state = stateName;
    this.render();

    if (this.animationTimer) clearTimeout(this.animationTimer);

    if (duration > 0) {
      this.animationTimer = setTimeout(() => {
        this.state = "idle";
        this.render();
      }, duration);
    }
  }

  triggerKiCharge() {
    this.kiCharging = true;
    this.render();
    setTimeout(() => {
      this.kiCharging = false;
      this.render();
    }, 280);
  }

  triggerChew() {
    this.state = "eating";
    this.triggerKiCharge();
    setTimeout(() => {
      this.state = "idle";
      this.render();
    }, 320);
  }

  triggerBurp() {
    this.state = "burping";
    this.render();
    setTimeout(() => {
      this.state = "idle";
      this.render();
    }, 500);
  }

  triggerPump() {
    this.triggerKiCharge();
  }

  /**
   * Determine Anime Transformation Tier for levels 1 ~ 10,000+
   */
  getAnimeForm() {
    const lvl = this.growthStage;

    if (lvl < 100) {
      // Lv 1 ~ 99: 드래곤볼 - 노말 손예훈
      return {
        anime: "dbz_base",
        title: "거북선류 수련생 손예훈",
        hairColor: "#1b1b1b",
        hairHi: "#37474f",
        auraColor: "none",
        bodyType: "dbz_orange",
        badge: "勳"
      };
    } else if (lvl < 250) {
      // Lv 100 ~ 249: 드래곤볼 - 계왕권 초사이어인
      return {
        anime: "dbz_ssj",
        title: "계왕권 초사이어인",
        hairColor: "#ffd600",
        hairHi: "#fffde7",
        auraColor: "rgba(255, 23, 68, 0.75)",
        glowColor: "#ffd600",
        light: true,
        bodyType: "dbz_orange",
        badge: "眞"
      };
    } else if (lvl < 500) {
      // Lv 250 ~ 499: 나루토 - 구미 차크라 모드 (쿠라마)
      return {
        anime: "naruto",
        title: "나뭇잎 닌자 구미 차크라 모드",
        hairColor: "#ff9100",
        hairHi: "#ffd54f",
        auraColor: "rgba(255, 145, 0, 0.75)",
        glowColor: "#ffab00",
        light: false,
        bodyType: "naruto_kurama",
        headband: true
      };
    } else if (lvl < 750) {
      // Lv 500 ~ 749: 블리치 - 만해 천쇄참월 호로화
      return {
        anime: "bleach",
        title: "만해 천쇄참월 호로화",
        hairColor: "#ff6f00",
        hairHi: "#ffb74d",
        auraColor: "rgba(213, 0, 0, 0.82)",
        glowColor: "#212121",
        light: true,
        bodyType: "bleach_shihakusho",
        hollowHorn: true
      };
    } else if (lvl < 1000) {
      // Lv 750 ~ 999: 원피스 - 태양의 신 니카 (기어 5)
      return {
        anime: "onepiece",
        title: "태양의 신 니카 기어 5",
        hairColor: "#ffffff",
        hairHi: "#e0f7fa",
        auraColor: "rgba(224, 247, 250, 0.9)",
        glowColor: "#ffffff",
        light: true,
        lightColor: "#80d8ff",
        bodyType: "gear5_white",
        cloudScarf: true
      };
    } else if (lvl < 1500) {
      // Lv 1000 ~ 1499: 귀멸의 칼날 - 해의 호흡 히노카미 카구라
      return {
        anime: "demonslayer",
        title: "해의 호흡 히노카미 카구라",
        hairColor: "#b71c1c",
        hairHi: "#ff5252",
        auraColor: "rgba(255, 87, 34, 0.85)",
        glowColor: "#ff3d00",
        light: false,
        bodyType: "demon_haori",
        flameMark: true,
        earrings: true
      };
    } else if (lvl < 2000) {
      // Lv 1500 ~ 1999: 주술회전 - 저주의 왕 료멘 스쿠나
      return {
        anime: "jjk",
        title: "저주의 왕 료멘 스쿠나",
        hairColor: "#f06292",
        hairHi: "#f8bbd0",
        auraColor: "rgba(183, 28, 28, 0.85)",
        glowColor: "#b71c1c",
        light: true,
        bodyType: "sukuna_tattoo",
        sukunaMarks: true
      };
    } else if (lvl < 3000) {
      // Lv 2000 ~ 2999: 나 혼자만 레벨업 - 그림자 군주 성예훈
      return {
        anime: "sololeveling",
        title: "그림자 군주 성예훈",
        hairColor: "#120024",
        hairHi: "#7c4dff",
        auraColor: "rgba(74, 20, 140, 0.88)",
        glowColor: "#d500f9",
        light: true,
        lightColor: "#e040fb",
        bodyType: "shadow_armor",
        shadowEyes: true
      };
    } else if (lvl < 4000) {
      // Lv 3000 ~ 3999: 헌터x헌터 - 극한 제약과 서약 곤육몬
      return {
        anime: "hunter",
        title: "극한 제약과 서약 곤육몬",
        hairColor: "#050505",
        hairHi: "#263238",
        auraColor: "rgba(33, 33, 33, 0.9)",
        glowColor: "#78909c",
        light: true,
        bodyType: "gon_chad",
        giantHair: true
      };
    } else if (lvl < 5000) {
      // Lv 4000 ~ 4999: 페이트 - 영웅왕 게이트 오브 바빌론
      return {
        anime: "fate",
        title: "영웅왕 게이트 오브 바빌론",
        hairColor: "#ffd600",
        hairHi: "#fffde7",
        auraColor: "rgba(255, 215, 0, 0.88)",
        glowColor: "#ff9100",
        light: true,
        bodyType: "gilgamesh_gold",
        gatePortals: true
      };
    } else if (lvl < 6000) {
      // Lv 5000 ~ 5999: 원펀맨 - 진심 시리즈 사이타마
      return {
        anime: "onepunch",
        title: "진심 시리즈 사이타마",
        hairColor: "#f5f5f5",
        hairHi: "#ffffff",
        auraColor: "rgba(255, 214, 0, 0.85)",
        glowColor: "#ffffff",
        light: true,
        bodyType: "saitama_suit",
        whiteCape: true
      };
    } else if (lvl < 7000) {
      // Lv 6000 ~ 6999: 에반게리온 - 초호기 각성 유사신화
      return {
        anime: "evangelion",
        title: "초호기 각성 유사신화 형태",
        hairColor: "#4a148c",
        hairHi: "#00e676",
        auraColor: "rgba(0, 230, 118, 0.85)",
        glowColor: "#7c4dff",
        light: true,
        bodyType: "eva_armor",
        evaHalo: true,
        atField: true
      };
    } else if (lvl < 8000) {
      // Lv 7000 ~ 7999: 천원돌파 그렌라간 - 초천원돌파 나선신
      return {
        anime: "gurren",
        title: "초천원돌파 나선신",
        hairColor: "#00e5ff",
        hairHi: "#76ff03",
        auraColor: "rgba(118, 255, 3, 0.9)",
        glowColor: "#00e5ff",
        light: true,
        bodyType: "gurren_spiral",
        chestShades: true,
        gigaDrill: true
      };
    } else if (lvl < 9000) {
      // Lv 8000 ~ 8999: 드래곤볼 - 완성형 무의식의 극의
      return {
        anime: "mui",
        title: "완성형 무의식의 극의",
        hairColor: "#eceff1",
        hairHi: "#ffffff",
        auraColor: "rgba(255, 255, 255, 0.95)",
        glowColor: "#81d4fa",
        light: true,
        lightColor: "#ffffff",
        bodyType: "dbz_torn_gi",
        dragonBalls: true
      };
    } else if (lvl < 10000) {
      // Lv 9000 ~ 9999: 다중 애니메 옴니버스 패왕
      return {
        anime: "omniverse",
        title: "다중 애니메 옴니버스 패왕",
        hairColor: "#ffffff",
        hairHi: "#ffd600",
        auraColor: "rgba(255, 214, 0, 0.95)",
        glowColor: "#00e5ff",
        light: true,
        lightColor: "#ff1744",
        bodyType: "god_omni",
        gatePortals: true,
        dragonBalls: true,
        chestShades: true
      };
    } else {
      // Lv 10000 MAX: 전지전능 애니메 절대신 박예훈
      return {
        anime: "anime_god",
        title: "전지전능 애니메 절대신 박예훈 (Lv.10000 MAX)",
        hairColor: "#ffd700",
        hairHi: "#ffffff",
        auraColor: "rgba(255, 215, 0, 1.0)",
        glowColor: "#00e5ff",
        light: true,
        lightColor: "#ff007f",
        bodyType: "god_omni",
        godCrown: true,
        gatePortals: true,
        dragonBalls: true,
        evaHalo: true,
        gigaDrill: true
      };
    }
  }

  render() {
    if (!this.container) return;

    const form = this.getAnimeForm();
    const isCharging = this.kiCharging;
    const kiScale = isCharging ? 1.15 : 1.0;

    // 1. Back Special Effects (Gate of Babylon, AT Field, Angel Halo, Dragon Balls)
    let backEffectsHtml = "";

    // Fate Gate of Babylon Golden Portals
    if (form.gatePortals) {
      backEffectsHtml += `
        <g id="gate-of-babylon" opacity="0.92">
          <!-- 6 Golden Ripple Portals -->
          <circle cx="65" cy="85" r="24" fill="none" stroke="#ffd700" stroke-width="3" filter="drop-shadow(0 0 8px #ffab00)"/>
          <circle cx="65" cy="85" r="16" fill="radial-gradient(circle, #ffd700 0%, #ff6f00 100%)" opacity="0.8"/>
          <line x1="65" y1="85" x2="110" y2="120" stroke="#ffd700" stroke-width="3.5" stroke-linecap="round"/>

          <circle cx="255" cy="85" r="24" fill="none" stroke="#ffd700" stroke-width="3" filter="drop-shadow(0 0 8px #ffab00)"/>
          <circle cx="255" cy="85" r="16" fill="radial-gradient(circle, #ffd700 0%, #ff6f00 100%)" opacity="0.8"/>
          <line x1="255" y1="85" x2="210" y2="120" stroke="#ffd700" stroke-width="3.5" stroke-linecap="round"/>

          <circle cx="50" cy="180" r="28" fill="none" stroke="#ffd700" stroke-width="3.5"/>
          <circle cx="270" cy="180" r="28" fill="none" stroke="#ffd700" stroke-width="3.5"/>
        </g>
      `;
    }

    // Evangelion Angelic Halo
    if (form.evaHalo) {
      backEffectsHtml += `
        <ellipse cx="160" cy="30" rx="60" ry="15" fill="none" stroke="#ffffff" stroke-width="4.5" filter="drop-shadow(0 0 10px #00e676)"/>
        <ellipse cx="160" cy="30" rx="55" ry="12" fill="none" stroke="#7c4dff" stroke-width="2.5"/>
      `;
    }

    // Evangelion AT Field Octagonal Barrier
    if (form.atField) {
      backEffectsHtml += `
        <polygon points="160,20 230,50 260,120 230,190 160,220 90,190 60,120 90,50" 
                 fill="none" stroke="#ff9100" stroke-width="3.5" opacity="0.75" filter="drop-shadow(0 0 12px #ff3d00)"/>
      `;
    }

    // Gurren Lagann Giga Spiral Drill
    if (form.gigaDrill) {
      backEffectsHtml += `
        <g id="giga-drill" transform="translate(160, 240) rotate(180)" opacity="0.85">
          <polygon points="0,0 -35,80 35,80" fill="url(#drillGrad)" stroke="#1b1e28" stroke-width="3"/>
          <ellipse cx="0" cy="80" rx="35" ry="10" fill="#76ff03"/>
        </g>
      `;
    }

    // Dragon Balls
    if (form.dragonBalls) {
      backEffectsHtml += `
        <g id="cosmic-dragon-balls" class="halo-rotate">
          <circle cx="85" cy="45" r="10" fill="#ff9100" stroke="#ffd600" stroke-width="2"/>
          <text x="85" y="49" font-size="9" fill="#d50000" font-weight="900" text-anchor="middle">★</text>
          <circle cx="235" cy="45" r="10" fill="#ff9100" stroke="#ffd600" stroke-width="2"/>
          <text x="235" y="49" font-size="9" fill="#d50000" font-weight="900" text-anchor="middle">★★</text>
          <circle cx="160" cy="5" r="12" fill="#ff9100" stroke="#ffd600" stroke-width="2.5"/>
          <text x="160" y="10" font-size="10" fill="#d50000" font-weight="900" text-anchor="middle">★★★</text>
        </g>
      `;
    }

    // 2. Colossal Gon-san Giant Hair
    let giantHairHtml = "";
    if (form.giantHair) {
      giantHairHtml = `
        <g id="gon-giant-hair" fill="#050505" stroke="#1b1e28" stroke-width="4">
          <!-- Soaring skyscraper hair column -->
          <path d="M 120 85 L 135 -140 Q 160 -180 185 -140 L 200 85 Z"/>
          <path d="M 130 50 L 142 -120 L 155 50" stroke="#37474f" stroke-width="3"/>
        </g>
      `;
    }

    // 3. Lightning Sparks
    let lightningHtml = "";
    if (form.light) {
      const col = form.lightColor || '#00e5ff';
      lightningHtml = `
        <g class="ki-lightning" stroke="${col}" stroke-width="2.8" fill="none" stroke-linecap="round">
          <path d="M 58 118 L 74 135 L 66 152 L 86 172"/>
          <path d="M 262 112 L 246 128 L 256 148 L 234 172"/>
          <path d="M 94 238 L 110 256 L 100 272 L 122 288"/>
          <path d="M 236 242 L 218 258 L 228 276 L 208 294"/>
        </g>
      `;
    }

    // 4. Body Costume (DBZ, Naruto, Bleach, Gear 5, Demon Slayer, JJK, Solo Leveling, etc.)
    let bodyHtml = "";

    if (form.bodyType === "naruto_kurama") {
      // Naruto Kurama Chakra Cloak
      bodyHtml = `
        <g id="naruto-body">
          <path d="M 142 125 L 142 155 Q 160 162 178 155 L 178 125 Z" fill="#ffb74d" stroke="#1b1e28" stroke-width="3"/>
          <!-- Orange Chakra Cloak -->
          <path d="M 125 155 L 85 195 L 110 265 L 210 265 L 235 195 L 195 155 Q 160 175 125 155 Z" 
                fill="#ff9100" stroke="#1b1e28" stroke-width="4"/>
          <!-- Swirling Tomoe Patterns -->
          <circle cx="160" cy="205" r="9" fill="#1b1e28"/>
          <circle cx="140" cy="225" r="6" fill="#1b1e28"/>
          <circle cx="180" cy="225" r="6" fill="#1b1e28"/>
          <!-- Black Sash Belt -->
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#212121" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#ff9100" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "bleach_shihakusho") {
      // Bleach Shihakusho Robe
      bodyHtml = `
        <g id="bleach-body">
          <path d="M 142 125 L 142 155 Q 160 162 178 155 L 178 125 Z" fill="#f5f5f5" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 125 155 L 85 195 L 110 265 L 210 265 L 235 195 L 195 155 Q 160 175 125 155 Z" 
                fill="#212121" stroke="#1b1e28" stroke-width="4"/>
          <!-- White Collar Crossing -->
          <path d="M 130 155 L 160 215 L 152 265" fill="none" stroke="#ffffff" stroke-width="4.5"/>
          <path d="M 190 155 L 160 215 L 168 265" fill="none" stroke="#ffffff" stroke-width="4.5"/>
          <!-- White Sash -->
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#ffffff" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#212121" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "gear5_white") {
      // One Piece Gear 5 Pure White Joyboy Attire
      bodyHtml = `
        <g id="gear5-body">
          <path d="M 142 125 L 142 155 Q 160 162 178 155 L 178 125 Z" fill="#ffffff" stroke="#1b1e28" stroke-width="3"/>
          <!-- Pure White Clothes -->
          <path d="M 125 155 L 85 195 L 110 265 L 210 265 L 235 195 L 195 155 Q 160 175 125 155 Z" 
                fill="#ffffff" stroke="#1b1e28" stroke-width="4"/>
          <!-- Purple Ribbon Sash -->
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#7c4dff" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#ffffff" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "demon_haori") {
      // Demon Slayer Checkered Haori
      bodyHtml = `
        <g id="demon-body">
          <path d="M 142 125 L 142 155 Q 160 162 178 155 L 178 125 Z" fill="#e0a080" stroke="#1b1e28" stroke-width="3"/>
          <!-- Checkered Haori Top -->
          <path d="M 125 155 L 85 195 L 110 265 L 210 265 L 235 195 L 195 155 Q 160 175 125 155 Z" 
                fill="#b71c1c" stroke="#1b1e28" stroke-width="4"/>
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#ffffff" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#212121" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "sukuna_tattoo") {
      // JJK Sukuna Muscular Tattoos
      bodyHtml = `
        <g id="sukuna-body">
          <!-- Ripped Muscular Chest with Tattoos -->
          <path d="M 125 155 L 85 195 L 110 265 L 210 265 L 235 195 L 195 155 Q 160 175 125 155 Z" 
                fill="#f5cbb7" stroke="#1b1e28" stroke-width="4"/>
          <!-- Sukuna Black Body Markings -->
          <path d="M 140 180 Q 160 195 180 180" stroke="#120024" stroke-width="4.5" fill="none"/>
          <circle cx="160" cy="215" r="8" fill="#120024"/>
          <path d="M 135 235 L 185 235" stroke="#120024" stroke-width="4"/>
          <!-- White Kimono Pants -->
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#212121" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#ffffff" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "shadow_armor") {
      // Solo Leveling Shadow Monarch Regal Armor
      bodyHtml = `
        <g id="shadow-monarch-body">
          <!-- Pitch Black Monarch Armor with Purple Accents -->
          <path d="M 125 155 L 80 190 L 105 265 L 215 265 L 240 190 L 195 155 Q 160 175 125 155 Z" 
                fill="#120024" stroke="#7c4dff" stroke-width="3.5"/>
          <!-- Glowing Purple Core Lines -->
          <polygon points="160,180 145,210 160,240 175,210" fill="#d500f9" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 0 8px #d500f9)"/>
          <rect x="110" y="260" width="100" height="16" rx="3" fill="#212121" stroke="#7c4dff" stroke-width="2.5"/>
          <path d="M 115 276 L 110 330 L 210 330 L 205 276 Z" fill="#0d001a" stroke="#7c4dff" stroke-width="3"/>
        </g>
      `;
    } else if (form.bodyType === "gilgamesh_gold") {
      // Fate Gilgamesh Golden Armor
      bodyHtml = `
        <g id="gilgamesh-body">
          <!-- Gleaming Golden Breastplate -->
          <path d="M 125 155 L 80 190 L 105 265 L 215 265 L 240 190 L 195 155 Q 160 175 125 155 Z" 
                fill="#ffd700" stroke="#b26a00" stroke-width="3.5"/>
          <!-- Crimson Engravings -->
          <path d="M 135 190 L 160 225 L 185 190" stroke="#d50000" stroke-width="3" fill="none"/>
          <rect x="110" y="260" width="100" height="16" rx="3" fill="#b26a00" stroke="#1b1e28" stroke-width="2.5"/>
          <path d="M 115 276 L 110 330 L 210 330 L 205 276 Z" fill="#ffd700" stroke="#b26a00" stroke-width="3"/>
        </g>
      `;
    } else if (form.bodyType === "saitama_suit") {
      // One Punch Man Saitama Yellow Suit & White Cape
      bodyHtml = `
        <g id="saitama-body">
          <!-- Yellow Hero Suit -->
          <path d="M 125 155 L 85 195 L 110 265 L 210 265 L 235 195 L 195 155 Q 160 175 125 155 Z" 
                fill="#ffd600" stroke="#1b1e28" stroke-width="4"/>
          <!-- Zipper -->
          <line x1="160" y1="165" x2="160" y2="260" stroke="#1b1e28" stroke-width="3.5"/>
          <!-- White Cape Behind Shoulders -->
          <path d="M 85 190 L 60 290 L 100 270 Z" fill="#ffffff" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 235 190 L 260 290 L 220 270 Z" fill="#ffffff" stroke="#1b1e28" stroke-width="3"/>
          <!-- Black Belt with Big Gold Buckle -->
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#212121" stroke="#1b1e28" stroke-width="3"/>
          <circle cx="160" cy="268" r="10" fill="#ffd600" stroke="#1b1e28" stroke-width="2"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#ffd600" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "eva_armor") {
      // Evangelion Unit-01 Purple & Green Armor
      bodyHtml = `
        <g id="eva-body">
          <path d="M 125 155 L 75 190 L 105 265 L 215 265 L 245 190 L 195 155 Q 160 175 125 155 Z" 
                fill="#4a148c" stroke="#1b1e28" stroke-width="4"/>
          <!-- Neon Green Chest Plates -->
          <rect x="135" y="185" width="20" height="35" rx="4" fill="#00e676" stroke="#1b1e28" stroke-width="2"/>
          <rect x="165" y="185" width="20" height="35" rx="4" fill="#00e676" stroke="#1b1e28" stroke-width="2"/>
          <!-- Orange Core -->
          <circle cx="160" cy="235" r="9" fill="#ff6d00" stroke="#ffffff" stroke-width="2"/>
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#212121" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#4a148c" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "gurren_spiral") {
      // Gurren Lagann Flaming Shades Core
      bodyHtml = `
        <g id="gurren-body">
          <path d="M 125 155 L 85 195 L 110 265 L 210 265 L 235 195 L 195 155 Q 160 175 125 155 Z" 
                fill="#d50000" stroke="#1b1e28" stroke-width="4"/>
          <!-- Iconic Sharp Red Shades on Chest -->
          <polygon points="120,205 160,225 150,195 130,190" fill="#212121" stroke="#ffd600" stroke-width="2.5"/>
          <polygon points="200,205 160,225 170,195 190,190" fill="#212121" stroke="#ffd600" stroke-width="2.5"/>
          <rect x="115" y="260" width="90" height="16" rx="3" fill="#ffd600" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 118 276 L 115 330 L 205 330 L 202 276 Z" fill="#212121" stroke="#1b1e28" stroke-width="3.5"/>
        </g>
      `;
    } else if (form.bodyType === "god_omni") {
      // Lv. 10000 Ultimate Anime God Cosmic Robe
      bodyHtml = `
        <g id="anime-god-body">
          <path d="M 125 155 L 70 190 L 105 265 L 215 265 L 250 190 L 195 155 Q 160 175 125 155 Z" 
                fill="url(#godRobeGrad)" stroke="#ffd700" stroke-width="4"/>
          <!-- Prismatic Core -->
          <circle cx="160" cy="215" r="14" fill="#ffffff" stroke="#ffd700" stroke-width="3" filter="drop-shadow(0 0 10px #00e5ff)"/>
          <rect x="110" y="260" width="100" height="16" rx="3" fill="#ffd700" stroke="#1b1e28" stroke-width="3"/>
          <path d="M 115 276 L 110 330 L 210 330 L 205 276 Z" fill="url(#godRobeGrad)" stroke="#ffd700" stroke-width="3.5"/>
        </g>
      `;
    } else {
      // Default: Dragon Ball Turtle Hermit Orange Gi
      bodyHtml = `
        <g id="dragonball-gi">
          <path d="M 142 125 L 142 158 Q 160 166 178 158 L 178 125 Z" fill="#e0a080" stroke="#1b1e28" stroke-width="3.5"/>
          <path d="M 132 152 Q 160 172 188 152 L 195 180 Q 160 192 125 180 Z" fill="#1565c0" stroke="#1b1e28" stroke-width="3.5"/>
          <path d="M 125 158 L 95 192 L 115 260 L 205 260 L 225 192 L 195 158 Q 160 178 125 158 Z" 
                fill="#ff6d00" stroke="#1b1e28" stroke-width="4"/>
          <path d="M 130 156 L 160 215 L 152 260" fill="none" stroke="#e65100" stroke-width="4"/>
          <path d="M 190 156 L 160 215 L 168 260" fill="none" stroke="#e65100" stroke-width="4"/>
          <circle cx="138" cy="202" r="16" fill="#ffffff" stroke="#1b1e28" stroke-width="2.5"/>
          <text x="138" y="208" font-family="'Black Han Sans', 'Jua', sans-serif" font-weight="900" font-size="14" fill="#1b1e28" text-anchor="middle">勳</text>
          <rect x="112" y="258" width="96" height="18" rx="3" fill="#1565c0" stroke="#1b1e28" stroke-width="3.5"/>
          <path d="M 116 274 L 110 330 L 210 330 L 204 274 Z" fill="#ff6d00" stroke="#1b1e28" stroke-width="4"/>
        </g>
      `;
    }

    // 5. Hair & Head Accessories
    let hairHtml = "";

    // Nika Gear 5 Billowing Cloud Hair
    if (form.anime === "onepiece") {
      hairHtml = `
        <g id="gear5-cloud-hair" fill="#ffffff" stroke="#1b1e28" stroke-width="3.5" filter="drop-shadow(0 0 8px #e0f7fa)">
          <path d="M 115 80 Q 90 20 135 15 Q 160 -15 185 15 Q 230 20 205 80 Z"/>
          <ellipse cx="120" cy="55" rx="20" ry="15"/>
          <ellipse cx="200" cy="55" rx="20" ry="15"/>
          <ellipse cx="160" cy="35" rx="25" ry="18"/>
        </g>
      `;
    } else if (form.anime === "anime_god" || form.godCrown) {
      // Golden Anime God Crown
      hairHtml = `
        <g id="god-crown-hair" fill="${form.hairColor}" stroke="#1b1e28" stroke-width="3.5">
          <path d="M 125 75 Q 110 15 130 -15 Q 145 25 150 72 Z"/>
          <path d="M 145 70 Q 155 -28 175 -38 Q 180 20 178 70 Z" fill="${form.hairHi}"/>
          <path d="M 172 72 Q 195 10 215 -10 Q 205 35 192 78 Z"/>
          <!-- Glowing Gold Crown -->
          <polygon points="130,45 145,15 160,35 175,15 190,45" fill="#ffd700" stroke="#ff6f00" stroke-width="3"/>
          <circle cx="160" cy="28" r="5" fill="#d50000"/>
        </g>
      `;
    } else {
      // Standard Spiky Anime / Saiyan Hair
      hairHtml = `
        <g id="anime-front-hair" fill="${form.hairColor}" stroke="#1b1e28" stroke-width="3.5">
          <path d="M 125 75 Q 110 15 130 -15 Q 145 25 150 72 Z"/>
          <path d="M 145 70 Q 155 -28 175 -38 Q 180 20 178 70 Z" fill="${form.hairHi}"/>
          <path d="M 172 72 Q 195 10 215 -10 Q 205 35 192 78 Z"/>
          <path d="M 112 85 Q 75 45 65 15 Q 92 65 118 90 Z"/>
          <path d="M 208 85 Q 245 45 255 15 Q 228 65 202 90 Z"/>
        </g>
      `;
    }

    // Forehead / Face Accessories:
    let faceExtrasHtml = "";

    // Konoha Headband
    if (form.headband) {
      faceExtrasHtml += `
        <g id="konoha-headband">
          <rect x="125" y="48" width="70" height="18" rx="4" fill="#212121" stroke="#1b1e28" stroke-width="2.5"/>
          <rect x="135" y="50" width="50" height="14" rx="2" fill="#cfd8dc" stroke="#1b1e28" stroke-width="1.5"/>
          <text x="160" y="61" font-size="10" font-weight="900" fill="#1b1e28" text-anchor="middle">勳</text>
        </g>
      `;
    }

    // Demon Slayer Flame Mark & Earring
    if (form.flameMark) {
      faceExtrasHtml += `
        <path d="M 175 58 Q 185 52 192 62 Q 188 68 180 66 Z" fill="#d50000"/>
        <rect x="195" y="98" width="6" height="15" fill="#ffffff" stroke="#d50000" stroke-width="1.5"/>
      `;
    }

    // Bleach Hollow Horn
    if (form.hollowHorn) {
      faceExtrasHtml += `
        <path d="M 120 70 Q 80 40 75 10 Q 95 35 125 55 Z" fill="#ffffff" stroke="#1b1e28" stroke-width="3"/>
        <line x1="85" y1="35" x2="105" y2="45" stroke="#d50000" stroke-width="2.5"/>
      `;
    }

    // Sukuna Tattoos
    if (form.sukunaMarks) {
      faceExtrasHtml += `
        <path d="M 135 88 L 142 98 L 138 108" stroke="#120024" stroke-width="2.5" fill="none"/>
        <path d="M 185 88 L 178 98 L 182 108" stroke="#120024" stroke-width="2.5" fill="none"/>
        <circle cx="160" cy="72" r="3" fill="#120024"/>
      `;
    }

    // Solo Leveling Glowing Purple Eyes
    if (form.shadowEyes) {
      faceExtrasHtml += `
        <circle cx="145" cy="85" r="4" fill="#d500f9" filter="drop-shadow(0 0 6px #e040fb)"/>
        <circle cx="175" cy="85" r="4" fill="#d500f9" filter="drop-shadow(0 0 6px #e040fb)"/>
        <path d="M 145 85 Q 130 80 115 72" stroke="#d500f9" stroke-width="2.5" fill="none" opacity="0.8"/>
        <path d="M 175 85 Q 190 80 205 72" stroke="#d500f9" stroke-width="2.5" fill="none" opacity="0.8"/>
      `;
    }

    // Masterpiece Assembled SVG
    const svgContent = `
      <svg viewBox="0 0 320 350" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="animeAuraGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <linearGradient id="godRobeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd700"/>
            <stop offset="50%" stop-color="#d500f9"/>
            <stop offset="100%" stop-color="#00e5ff"/>
          </linearGradient>

          <linearGradient id="drillGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#76ff03"/>
            <stop offset="100%" stop-color="#00e5ff"/>
          </linearGradient>

          <clipPath id="yehoonFaceClip">
            <ellipse cx="160" cy="100" rx="44" ry="56"/>
          </clipPath>
          <clipPath id="jinwooFaceClip">
            <ellipse cx="160" cy="100" rx="44" ry="56"/>
          </clipPath>
        </defs>

        <!-- 1. KI / CHAKRA / REIATSU FLAME AURA -->
        ${form.auraColor !== "none" ? `
          <g id="anime-flame-aura" transform="scale(${kiScale}) translate(${isCharging ? -18 : 0}, ${isCharging ? -12 : 0})">
            <path d="M 160 -15 
                     Q 240 40 250 140 
                     Q 275 220 220 320 
                     Q 160 350 100 320 
                     Q 45 220 70 140 
                     Q 80 40 160 -15 Z" 
                  fill="${form.auraColor}" filter="url(#animeAuraGlow)"/>
            <path d="M 160 10 
                     Q 220 60 225 150 
                     Q 245 220 205 290 
                     Q 160 320 115 290 
                     Q 75 220 95 150 
                     Q 100 60 160 10 Z" 
                  fill="${form.glowColor || '#ffd600'}" opacity="0.65" filter="blur(6px)"/>
          </g>
        ` : ''}

        <!-- 2. Back Special Props (Gate of Babylon, AT Field, Halo, Drill) -->
        ${backEffectsHtml}

        <!-- 3. Giant Gon Hair (if applicable) -->
        ${giantHairHtml}

        <!-- 4. Lightning Sparks -->
        ${lightningHtml}

        <!-- 5. Body Costume -->
        ${bodyHtml}

        <!-- 6. USER PHOTO FACE INTEGRATION (YEHOON WITH SUNGLASSES) -->
        <g id="anime-yehoon-face">
          <ellipse cx="160" cy="100" rx="46" ry="58" fill="#1b1e28"/>
          <g clip-path="url(#yehoonFaceClip)">
            <image href="yehoon_face.png" x="80" y="-35" width="160" height="284" preserveAspectRatio="xMidYMid slice" 
                   style="filter: contrast(1.08) brightness(${isCharging ? 1.25 : 1.05});"/>
          </g>
        </g>

        <!-- 7. Face Extras (Headband, Tattoos, Hollow Horn, Purple Eyes) -->
        ${faceExtrasHtml}

        <!-- 8. Hair -->
        ${hairHtml}

        <!-- 9. Eating Ki Sparkle -->
        ${this.state === "eating" ? `
          <circle cx="160" cy="120" r="22" fill="#ffffff" filter="url(#animeAuraGlow)"/>
          <circle cx="160" cy="120" r="14" fill="${form.glowColor || '#ffd600'}"/>
          <text x="160" y="125" font-size="14" text-anchor="middle">⚡</text>
        ` : ''}
      </svg>
    `;

    this.container.innerHTML = svgContent;
  }
}

// Global Attachment
window.JinwooCharacter = JinwooCharacter;
