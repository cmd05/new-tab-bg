// Set a random image
function setRandImage() {
    chrome.runtime.getPackageDirectoryEntry(function(directoryEntry) {
        directoryEntry.getDirectory('bg', {}, function(subDirectoryEntry) {
            var directoryReader = subDirectoryEntry.createReader();
            // List of DirectoryEntry and/or FileEntry objects.
            var filenames = [];
            (function readNext() {
                directoryReader.readEntries(function(entries) {
                    if (entries.length) {
                        for (var i = 0; i < entries.length; ++i) filenames.push(entries[i].name);
                        readNext();
                    } else {
                        // No more entries, so all files in the directory are known.
                        randImg = filenames[Math.floor(Math.random()*filenames.length)];
                        document.querySelector(".background").style.backgroundImage = "url(bg/"+randImg +")";
                    }
                });
            })();    
        });
    });
}

setRandImage();

// Show clock
function startTime() {
  const today = new Date();
  const h = today.getHours();
  const m = checkTime(today.getMinutes());
  document.getElementById('clock').innerHTML =  h + ":" + m;

  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) i = "0" + i;  // add zero in front of numbers < 10
  return i;
}

startTime()