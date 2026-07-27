async function fetchlist() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Monochromasity/EXARDL/refs/heads/main/list.json");
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
    if (window.location.search != "" && window.location.search != "?") {
      itemparam = parseInt(window.location.search.substring(1)) - 1;
      if (i == itemparam) {
        item.className = "item selected";
      } else if (itemparam >= 0 && itemparam < list.length) {
        item.className = "item";
      } else if (i == 0) {
        window.location.search = "?1";
        item.className = "item selected";
      }
    } else if (i == 0) {
      window.location.search = "?1";
      item.className = "item selected";
    }
    item.onclick = function() {
      if (document.getElementById(i.toString()).className != "item selected") {
        document.getElementById((parseInt(window.location.search.substring(1)) - 1).toString()).className = "item";
        document.getElementById(i.toString()).className = "item selected";
        window.location.search = "?" + (i+1).toString();
      }
    };
    item.id = i;
    // Level rank
    const rank = document.createElement("div");
    const ranktxt = document.createTextNode("#".concat(i+1));
    rank.appendChild(ranktxt);
    rank.className = "rank";
    item.appendChild(rank);
    // Level name
    const name = document.createElement("div");
    const nametxt = document.createTextNode(list[i]["level"]);
    name.appendChild(nametxt);
    name.className = "name";
    item.appendChild(name);
    htmllist.appendChild(item);
  }
}

printlist();
