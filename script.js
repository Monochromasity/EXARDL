async function fetchlist() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Monochromasity/EXARDL/56cfddee08dc278fac2f5bd7e3321bd4591afe57/list.json");
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
      itemparam = parseInt(window.location.search.substring(1));
      allids = [];
      for (j = 0; j < list.length; j++) {
        allids.concat(list[j]["id"]);
      }
      console.log(list[i]["id"]);
      console.log(itemparam);
      if (list[i]["id"] == itemparam) {
        item.className = "item selected";
        console.log("equals");
      } else if (allids.includes(itemparam)) {
        item.className = "item";
        console.log("includes");
      } else if (i == 0) {
        window.location.search = "?" + list[0]["id"].toString();
        item.className = "item selected";
        console.log("i is 0");
      }
    } else if (i == 0) {
      window.location.search = "?" + list[0]["id"].toString();
      item.className = "item selected";
      console.log("is nothing, i is 0");
    }
    item.onclick = function() {
      if (document.getElementById(this.id).className != "item selected") {
        document.getElementById(window.location.search.substring(1)).className = "item";
        document.getElementById(this.id).className = "item selected";
        window.location.search = "?" + this.id;
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
  }
}

printlist();
