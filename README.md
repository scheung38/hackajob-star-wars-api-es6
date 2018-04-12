Pouring node-9.11.1.high_sierra.bottle.tar.gz
Error: The `brew link` step did not complete successfully
The formula built, but is not symlinked into /usr/local
Could not symlink bin/node
Target /usr/local/bin/node
already exists. You may want to remove it:
  rm '/usr/local/bin/node'

To force the link and overwrite all conflicting files:
  brew link --overwrite node

To list all files that would be deleted:
  brew link --overwrite --dry-run node



Run different node.js versions on a Mac using homebrew
https://gist.github.com/jhohlfeld/bc0ed726550192eb183d

Remove all versions with `brew uninstall --force node`.

You need to run "nvm install 9.11.1" to install it before using it.

http://michael-kuehnel.de/node.js/2015/09/08/using-vm-to-switch-node-versions.html

https://challenges.hackajob.co/swapi/api/people/?format=json
https://challenges.hackajob.co/swapi/api/films/?format=json

https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object