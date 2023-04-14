javascript:(
  function(){
    try {
      var f = function(q) {
        var r = [];
        var x = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < x.snapshotLength; i++) r.push(x.snapshotItem(i).innerText);
        return r;
      };
      var I = [], O = [];
      if(document.domain == 'atcoder.jp') {
        I = f("//div/section/h3[starts-with(text(),'Sample Input')]/following-sibling::pre[1]");
        O = f("//div/section/h3[starts-with(text(),'Sample Output')]/following-sibling::pre[1]");
      }
      if(document.domain == 'codeforces.com') {
        I = f("//div/div[text()='Input']/following-sibling::pre[1]");
        O = f("//div/div[text()='Output']/following-sibling::pre[1]");
      }
      if((I.length == 0) || (I.length != O.length)) throw "failed to parse.";
      var oneliner = [
        '(X=$(ls -t $(basename -s .cc *.cc) 2>/dev/null|head -n 1);(',
        I.map((x,i) => "echo " + String(i+1) + " " + btoa(x) + " " + btoa(O[i])).join(";"),
        ')|while read i I O; do echo "====== $X:$i ======";',
        '(echo $I|base64 -d|"./$X" 2>/dev/null||echo RE:$?>&2)|diff -L exp -L act -b <(echo $O|base64 -d) -;',
        'done 2>&1)|more',
      ].join("");
      navigator.clipboard.writeText(oneliner);
      alert(I.map((x,i) => "____ in" + String(i+1) + " ____\n" + x + "\n____ out" + String(i+1) + " ____\n" + O[i]).join("\n"));
    }
    catch (e) {
      alert(e);
    }
  }
)();
