async function fetchlist() {
  try {
    const commits = await fetch("https://api.github.com/repos/Monochromasity/EXARDL/commits?path=list.json");
    const cjson = await commits.json();
    const response = await fetch("https://raw.githubusercontent.com/Monochromasity/EXARDL/" + cjson[0]["sha"] + "/list.json");
    const list = await response.json();
    return list;
  } catch (error) {
    console.log(error);
  }
}

async function leveldetails(inputname) {
  // Get level div
  const leveldiv = document.getElementById("level");
  // Level name in level div
  const levelname = document.createElement("div");
  const levelnametxt = document.createTextNode(inputname);
  levelname.appendChild(levelnametxt);
  levelname.className = "levelname";
  leveldiv.appendChild(levelname);
}

async function printlist() {
  const list = await fetchlist();
  const htmllist = document.getElementById("list");
  allids = [];
  for (i = 0; i < list.length; i++) {
    allids.push(list[i]["id"]);
  }
  itemparam = parseInt(window.location.search.substring(1));
  for (i = 0; i < list.length; i++) {
    // Level div
    const item = document.createElement("div");
    if (window.location.search != "" && window.location.search != "?") {
      if (list[i]["id"] == itemparam) {
        item.className = "item selected";
      } else if (allids.includes(itemparam)) {
        item.className = "item";
      } else if (i == 0) {
        window.location.search = "?" + list[0]["id"].toString();
        item.className = "item selected";
      }
    } else if (i == 0) {
      window.location.search = "?" + list[0]["id"].toString();
      item.className = "item selected";
    }
    item.onclick = async function() {
      if (this.className != "item selected") {
        document.getElementById(window.location.search.substring(1)).className = "item";
        this.className = "item selected";
        window.location.search = "?" + this.id;
        //await leveldetails(this.lastElementChild.textContent);
      }
    };
    item.id = list[i]["id"].toString();
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
    // If this level is selected
    if (item.className == "item selected") {
      await leveldetails(list[i]["level"]);
    }
  }
}

printlist();
