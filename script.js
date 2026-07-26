async function fetchlist() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Monochromasity/EXARDL/main/list.json");
    const list = await response.json();
    return list;
  } catch (error) {
    console.log(error);
  }
}

async function printlist() {
  const list = await fetchlist();
  const htmllist = document.getElementById("list");
  for (i = 0; i < list.length; i++) {
    // Level div
    const item = document.createElement("div");
    item.className = "item";
    // Level rank
    const rank = document.createElement("p");
    const ranktxt = document.createTextNode("#".concat(i+1));
    rank.appendChild(ranktxt);
    rank.className = "rank";
    item.appendChild(rank);
    // Level name
    const name = document.createElement("p");
    const nametxt = document.createTextNode(list[i]["level"]);
    name.appendChild(nametxt);
    name.className = "name";
    item.appendChild(name);
    htmllist.appendChild(item);
  }
}

printlist();
