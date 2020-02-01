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
* SEO-ed (because web-crawler can analyze the site)
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
* expensive to update as it can only update itself in it's entirety 
Virtual DOM:
* Abstraction of an abstraction of structured text (HTML)
* Representation of the DOM with JS data structures/objects 

## VueJS syntax cheat sheet

| shortcoode 	| usecase               	|
|------------	|-----------------------	|
| @          	| Events                	|
| {{ }}      	| Text                  	|
| v-if       	| Conditional rendering 	|
| v-for      	| For-loops             	|
| :          	| Data-binding          	|

## VueJS dogmas

* Data Down, Events Up
* take advantage of re-rendering via computed properties & $emit
* implement re-usable customizable components


# Testing

|             | Bug            | No Bug         |
|-------------|----------------|----------------|
| Test fails  | True Positive  | False Positive |
| Test passes | False Negative | True Negative  |

## Advantages

* Saves money (manual testing is expensive in the long run, finding bugs in production can cost much, you loose users/customers when they are not satisfied)
* Security (glitches, machines crashing )
* Product quality
* Customer

## Pillars
1. Quality assurance
2. Refactor with confidence
3. Prevent over-engineering
4. Modularization
5. Documentation

## Testing Styles

1. Manual (use the least as this is the slowest with the least confidence)
2. End-to-End (like Cypress, Testcafé; Pros: tests automatically much functionality and user stories at once, leicht nach zu vollziehe; Cons: bugs müssen erst investigated werden (ist nicht sofort klar woher die bugs kommen) )
3. Integration (Frontend: Components (vue-test-utils); Server: (apollo) resovler)
4. Unit (Frontend: Filters, Validators; Server: (apollo), helpers, Directives) (use the most as this is the fastest with the most confidence, most granular and most specific; Cons: only tests very specific functionality but can still not catch every bug, you still have to know which unit tests to write)

## Do's and Dont's 

### Do's
* check that actions changes something
* check via css classes/ids
* Arrange -> Act -> Assert (Given, When,)
    * testing pattern to describe the natural phases of most software test
    * *Arrange*: setup; *Act*: behaviour under test (typically single line); *Assert*: verification
* try various context in nested test cases
* mutant testing


### Don'ts 
* sacrifice simplicity to reduce redundancy
* create atomic tests

