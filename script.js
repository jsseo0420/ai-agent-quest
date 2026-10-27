const input = document.getElementById("memo-input");
const saveBtn = document.getElementById("save-btn");
const list = document.getElementById("memo-list");

// 저장된 메모 불러오기 (없으면 빈 배열)
let memos = JSON.parse(localStorage.getItem("memos")) || [];

// 예전 형식(글자만 저장된 메모)은 오래된 것부터 순서 번호를 붙여 변환
memos = memos.map(function (memo, i) {
  if (typeof memo === "string") {
    return { no: memos.length - i, text: memo };
  }
  return memo;
});

function render() {
  list.innerHTML = "";
  memos.forEach(function (memo) {
    const card = document.createElement("div");
    card.className = "card";

    const no = document.createElement("div");
    no.className = "card-no";
    no.textContent = "#" + memo.no;

    const text = document.createElement("div");
    text.textContent = memo.text;

    card.appendChild(no);
    card.appendChild(text);
    list.appendChild(card);
  });
}

saveBtn.addEventListener("click", function () {
  const text = input.value.trim();
  if (text === "") return;

  // 다음 순서 번호 = 지금까지 가장 큰 번호 + 1
  const nextNo = memos.length > 0 ? memos[0].no + 1 : 1;

  memos.unshift({ no: nextNo, text: text }); // 최신 메모를 맨 앞에
  localStorage.setItem("memos", JSON.stringify(memos));
  input.value = "";
  render();
});

render();
