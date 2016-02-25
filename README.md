This is the successor to Unplugged Life.

Theory: Internet addiction happens when you're low on cognitive energy and you impulsively surf the web. A lack of accountability exacerbates the problem.

However, blocking these sites entirely leaves you with no options for relaxing. Sometimes your brain does need a break.

Pause helps you avoid the first without disabling the second: you choose the list of domains, and Pause will stop you for 5 seconds before letting you through. The 5 second pause turns indulging an impulse into a conscious decision.

Finally, Pause helps you stay accountable. Pause measures the amount of time you spend on your computer, the amount of time you spend on the Internet, and the amount of time you spend on your graylisted sites. You'll see output like:
- 8 hours today on your computer
- 3 hours 45 minutes on the Internet
- 2 hours 59 minutes on graylisted sites

The algorithm works like so:
- When your computer is on, Pause counts the minutes.
-

The Pause screen is just an iFrame to any other site or app.


can be customized by any number of modules that may inspire you. Currently, modules include:
- Inspirational quotes (taken from an Evernote file)
- A list of side projects (taken from an Evernote file)
- A list of Evernote notes with a tag (in my case, @unread)
- A message to yourself

Transitioning away from a Pause screen can happen by API: just hit the /unpause endpoint. Here are available modules for unpausing a screen:
- The 5 second timer, which implements the above screen. Pressing SPACE will pause the countdown timer.
- The piano program. If a MIDI device is detected, go to the Piano program and play a short section that shouldn't take longer than a minute.
- Flashcards. A random set of 10 spaced-repetition flashcards.



Pause is the program that:
- Maintains the list of websites to Pause
- Runs the JavaScript logic for determining which app to display
- Updates the hosts file and nginx configuration accordingly
- Listens to the /unpause API, and allows the user through once hit
- Requires a pause every X minutes.
- Extract logic from Unplugged Life.
- Fix: HTTPS.
- Fix: nginx config is busted with multiple lists. For now, just remove the multiple lists feature.

Unplugged Life:
- Runs a 5 second timer, then hits the /unpause API
- Is a collection of Evernote modules
- Fix: Evernote opens up every time? That's annoying.

Flashcards:
- A program that reads flashcards from (version-controlled) text files
- Lets you edit those flashcards in those text files
- Works as a separate website: flashcards/

Problem: how do I signal from separate programs to unpause? Somehow, a signal needs to go from the program to Pause.
- Avoid the problem: just always let it be on a timer, pausable by spacebar. That's a perfect MVP, actually.
- Alternatively, define a plugin that hooks onto certain events and signals to Pause to unpause.
