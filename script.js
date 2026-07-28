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
async function leveldetails(inputlevel) {
  // Get level div
  const leveldiv = document.getElementById("level");
  // Level name in level div
  const levelname = document.createElement("div");
  const levelnametxt = document.createTextNode(inputlevel["level"]);
  levelname.appendChild(levelnametxt);
  levelname.className = "levelname";
  leveldiv.appendChild(levelname);
  // Lower div
  const lowerdiv = document.createElement("div");
  lowerdiv.className = "lowerdiv";
  // Details div
  const detailsdiv = document.createElement("div");
  detailsdiv.className = "detailsdiv";
  // Records div
  const recordsdiv = document.createElement("div");
  recordsdiv.className = "recordsdiv";
  // Level creators, publisher, and verifier
  const cpv = document.createElement("div");
  const creators = document.createElement("b");
  const creatorstxt = document.createTextNode(inputlevel["creators"]);
  creators.appendChild(creatorstxt);
  const publisher = document.createElement("b");
  const publishertxt = document.createTextNode(inputlevel["publisher"]);
  publisher.appendChild(publishertxt);
  const verifier = document.createElement("b");
  const verifiertxt = document.createTextNode(inputlevel["verifier"]);
  verifier.appendChild(verifiertxt);
  const creatorlabel = document.createTextNode("Created by ");
  const publisherlabel = document.createTextNode(", published by ");
  const verifierlabel = document.createTextNode(", verified by ");
  cpv.appendChild(creatorlabel);
  cpv.appendChild(creators);
  cpv.appendChild(publisherlabel);
  cpv.appendChild(publisher);
  cpv.appendChild(verifierlabel);
  cpv.appendChild(verifier);
  cpv.className = "cpvlabel";
  detailsdiv.appendChild(cpv);
  // Video iframe
  // <iframe width="560" height="315" src="https://www.youtube.com/embed/MM7zFyFqD8A?si=JmUGHUIf9_PccYe0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  const video = document.createElement("iframe");
  video.width = "560";
  video.height = "315";
  video.src = "https://www.youtube.com/embed/MM7zFyFqD8A";
  video.className = "video";
  recordsdiv.appendChild(video);
  lowerdiv.appendChild(detailsdiv);
  lowerdiv.appendChild(recordsdiv);
  leveldiv.appendChild(lowerdiv);
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
      await leveldetails(list[i]);
    }
  }
}

printlist();
