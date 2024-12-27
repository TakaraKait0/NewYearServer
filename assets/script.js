// 音楽再生関数
function playMusic() {
    const music = document.getElementById('background-music');
    music.volume = 0.5; // 音量を調整 (0.0 - 1.0)
    music.play().catch(error => {
        console.error('音楽の再生に失敗しました:', error);
    });
}

// テキストの表示
function showMessage() {
    const texts = [
        '新年あけましておめでとうございます',
        '昨年は大変お世話になりました',
        '新しい年が素晴らしい年になりますように',
        '本年もどうぞよろしくお願い申し上げます'
    ];

    let totalAnimationTime = 0;

    texts.forEach((text, textIndex) => {
        const container = document.getElementById(`text-container-${textIndex + 1}`);
        text.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = 'char';
            const animationDelay = charIndex * 0.2 + textIndex * 3.5; // 遅延時間を計算
            span.style.animationDelay = `${animationDelay}s`;
            container.appendChild(span);

            // 最後のアニメーション時間を記録
            totalAnimationTime = Math.max(totalAnimationTime, animationDelay);
        });
    });

    // テキスト表示後にボタンを表示
    setTimeout(() => {
        const omikujiBtn = document.getElementById('omikuji-btn');
        omikujiBtn.style.display = 'block';
    }, (totalAnimationTime + 1) * 1000); // アニメーション時間 + 1秒余裕
}

// フェードイン開始
function startFadeIn() {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('fade-out');
}

// 音楽再生確認ダイアログ
document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.getElementById('music-dialog');
    const okButton = dialog.querySelector('.ok');
    const cancelButton = dialog.querySelector('.cancel');
    const setShowMessageTime = 4500;

    okButton.addEventListener('click', () => {
        playMusic();
        dialog.style.display = 'none';
        startFadeIn();
        setTimeout(showMessage, setShowMessageTime);
    });

    cancelButton.addEventListener('click', () => {
        dialog.style.display = 'none';
        startFadeIn();
        setTimeout(showMessage, setShowMessageTime);
    });
});

// おみくじ結果と対応する画像
const omikujiResults = [
    { name: '大吉', image: 'assets/omikuji/daikichi.png', probability: 0.11 },
    { name: '吉', image: 'assets/omikuji/kichi.png', probability: 0.17 },
    { name: '中吉', image: 'assets/omikuji/chukichi.png', probability: 0.18 },
    { name: '小吉', image: 'assets/omikuji/shokichi.png', probability: 0.24 },
    { name: '末吉', image: 'assets/omikuji/suekichi.png', probability: 0.24 },
    { name: '凶', image: 'assets/omikuji/kyo.png', probability: 0.05 },
    { name: '大凶', image: 'assets/omikuji/daikyo.png', probability: 0.01 }
];

// 確率に基づいておみくじの結果を選ぶ
function getOmikujiResult() {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const result of omikujiResults) {
        cumulativeProbability += result.probability;
        if (random <= cumulativeProbability) {
            return result;
        }
    }

    // フォールバック
    return omikujiResults[0];
}

/*
おみくじ結果を表示
 */
function showOmikuji() {
    const result = getOmikujiResult();
    const resultImg = document.getElementById('omikuji-result-img');
    resultImg.src = result.image;
    resultImg.alt = result.name;

    const modal = document.getElementById('omikuji-modal');
    modal.style.display = 'block';
}

/*
おみくじモーダルを閉じる
*/
function closeOmikuji() {
    const modal = document.getElementById('omikuji-modal');
    modal.style.display = 'none';
}

// おみくじボタンのイベントリスナー
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('omikuji-btn').onclick = showOmikuji;
});
