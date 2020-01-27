# Allgemein

* Frontend (bestehend aus Mobile & Web) <-API-> Backend (enthält Datenbank)
* Alles wird von DevOps gemanaged   
* Buss Faktor
    * Macht auf die Signifikanz vom Teilen von Wissen aufmerksam


# Git

a distributed version control system

## Aufbau
Bestehend aus:
* Repository
    * Index
        * Stash
        * RefLog
        * Commits
        * Branches (a pointer to one commit)
            * Remotes
        * Upstream branches
    * Working tree
    * Files
* Github: Pull request
    * Code Reviews
    * Forks 

## Commands
git remote...
* List: -v 
* modify: add|remove <remote> <url>
* Download: git fetch <remote> 
* Sync: git (reset|merge) <remote/branch>
* Upload: git push <remote> -u <branch>

History of actions: git reflog

## Branches

## Merge vs Rebase


**Merge:**
```
git checkout feature
git merge master
```
Fasse alle Änderungen zum master (seit letztem gemeinsamem commit) in einem neuen Commit auf dem feature branch zusammen.
--> Nicht destruktiv (history bleibt erhalten), dafür ggf. unnötige merge commits
--> Sollte öffentliche merges benutzt werden

**Rebase:**
```
git checkout feature
git rebase master
```

Ändert die history: Erschafft aus jedem commit (=Änderung) des feature branchs (seit letztem gemeinsamen commit) einen neuen commit und wendet diesen nacheinander als neuen commit auf die Spitze des masters an (als feature branch)
--> Mehr übersicht, weil keine unnötigen merge commits und aufgrund des linearen Verlaufs
--> Aber Vorsicht: da sich die history ändert und git ein ein distributed version control system ist, können unterschiedliche historys auftreten. Dies sollte vermieden werden


# VueJS

## Server vs Client Side Rendering

For static sites always server side rendering.
For dynamic sites it depends. 

### Server Side rendering

Two Options:
* Pre-rendered (dynamic content like user data hardly possible): Renders files into HTML files (eg jekyll renders markdown) and statically provisions them
* Dynamicly rendered: Logic is implemented in server which puts the dynamic content into the app itself for each frequest

PRO: 
* Is faster on slow connections (especially the initial page)
* SEO-ed (because web-crawler can analize the site)
* great for static sites

CON: 
* More processing on the servers as they have to compose the HTMLs for the response
* slower page rendering (as you have to do a full page reloads every time)
* poor site interactions

### Client side rendering
Client get's App with heavy JS logic to Fetch all the dynamic content itself

PRO:
* great for web applications
* robust selection of JS libraries
* + inverse of server-side cons
CON:
* usually requires external libraries
* Inverse of server-side pros

## Virtual DOM

DOM: 
* a tree like data structure that was parsed by the browser from the HTML
* expensive to update as it can only update the entire thing
Virtual DOM:
* Representation of the DOM with JS data structures/objects 

# Fragen:

## Mit Antworten

* What does “fullstack developer” mean?
    * Wissne über Client **&** Server (Paradigmen, Sprachen, Frameworks), nicht so tiefes Wissen in Backend und Frontend
* What is the bus factor and how can you improve it?
    * Beschreibt... Macht aufmerksam... Verbessern durch wissen teilen, pair programming etc.
* What is Free Software compared to Open Source?
    * Kostenlos, Quellcode einsehbar, weiterverwendbar (auf Lizenzen achten)
* What git commands open an internet connection?
    * push, fetch, pull
* Why is Open-Source code relevant for data privacy and security?
    * Kann von experten geprüft werden, man vertraut auf Kryptografie und nicht auf das Verstecken der logik (security by obscurity vs security by design, openness...)
* What is a git remote?
    * Gemeinsames repo für das ganze Team, enthält meist keinen working tree sondern nur den state (*.git* folder)
* What is an upstream branch?
    * Der "tracking branch" vom dem gepullt und auf den gepushed wird. 
* What do the terms "working tree" and "index" mean in connection with git?
    * Der Begriff working tree fässt alle Dateien innerhalb eines repos zusammen, die unmittelbar für den Entwickler sichtbar sind zusammen z.B. source files. Der index ist eine Datenbank die von git im .git Verzeichnis gepflegt wird. Sie entält informationen über commits, Branches, Remotes, Stashes, Reflogs ...

* What are the differences between a git branch and a git tag?
    * Beides markiert einen commit mit einem typischen Zeiger. Der HEAD kann nur auf einen branch Zeiger zeigen, nicht auf einen tag Zeiger. Der branch Zeiger wird außerdem stets auf seinen neusten commit bewegt, ein Tag Zeiger bleibt fest. Aufgrund desswen werden Tags für versionen und branches für Entwicklungspfade genutzt. 
* Explain the differences between git rebase and git merge and the advantages and disadvantages of the two commands, and why would you use one or the other?
    * Siehe oben
* I accidentally committed to the wrong feature branch. How can I move the commit to a new branch which branches off the current master branch?
    * `git reset --soft HEAD~1`, `git checkout -b new-branch`, `git commit -m "msg"`
* Someone has forked the repository of a software library and submitted a pull request to it and you happen to use this library. Now you want to send some commits into this PR. But you are not a maintainer and you don’t have write permissions to the source branch of the PR. What can you do?
    * Ask to get a maintainer of his fork OR fork his repo and make a PR myself to his repo

* What are the indicators of a well-maintained repository on Github?
    * Many stars, watchers, forks. Bonus: good readme, many/regular commits
* What types of action are considered a “contribution” on Github?
    * pushing commits, raising issues, reviewing PR requests
* What are the files to read before you start to contribute to a repo? Where to find contribution guidelines?
    * Readme, Wiki, Docs (often refered to in the Readme)






## Not sure

* What is a scenario in which you MUST rewrite the commit history?
    * Bei git rebase wird auf jeden Fall history geändert. Aber man kann eigentlich immer auch merge anstelle von rebase nehmen. 
* Is `git reset --hard` irrevocable? If so, why?
    * `git reset`: setzt HEAD zu commit/branch zurück, mit `--hard` außerdem auch index und working tree (löscht)
    * Ja, ist unwiederruflich da Änderungen, die nicht im index gespeichert sind, verloren gehen können
* Is git `clean -df` irrevocable? If so, why?
    * Ja, da untracked dateien gelöscht werden.
    * `git clean`, löscht rekursiv alle dateien die nicht im index sind (untracked)
    * `-d` rekursiv auch in untracked directories
    * `-f` = force, muss angegeben sein damit git auch löschen kann 
* What is the difference between a "hard" reset and a "soft" reset?
    * `git reset x`: makes branch pointer (**and** thus HEAD as well) point to x == like checkout, but without detached state
    * `soft`: bringt changes in Index (staged)
    * `mixed`: (std) bringt changes ins Working Directory (unstage)
    * `hard`: löscht changes
* How do you write good commit messages? What are the criteria for this?
    * Subject (kurz ~ 50 Zeichen) und Body (für What, Why und How) mit einer Leerzeile trennen
    * imperativ & linewrap
* From which attributes is the git commit id generated?
    * Vom commit selbst. Z.B. commit msg, commit inhalt, Datum und Zeit
* How can I get changes to path/to/file file from the branch origin/other-branch without the commits from there?
    * `git checkout path/to/file origin/other-branch`
* What is a strategy to tell if a bug was introduced in your PR or if it was already present in master? Explain in details.
    * `git bisect` let's you find the exact commit the bug was introduced. You mark good and a bad commits and it's suggesting commits (doing a binary search) to check.



## No idea?

* What happens to a commit with a git cherry-pick?
    * nothing hapens to the picked commit, but it is applied to the HEAD
* I have been working on a feature branch for a long time. After merging the origin/master into my feature branch several times, the commit history has become a bit chaotic. How can I merge all commits of my feature branch into a single commit without getting into merge conflicts again?
    * With an interactive rebase?
* What are the git commands to reproduce the file diff of a PR on Github?
    * ??? `git diff feature...base` triple dot syntax?


## To sort




## TODO

