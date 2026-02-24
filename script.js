/* =====================================================
   JS FILE: Animated Countdown
   What this script does:
   1) Selects all countdown numbers (the spans inside .nums)
   2) Adds animation event listeners to each number
   3) When one animation ends, it triggers the next step:
      - "in" animation ends -> switch to "out"
      - "out" animation ends -> activate next number
   4) When the last number finishes, hide the counter and show final message
   5) Replay button resets everything and runs again
===================================================== */

/* =====================================================
   1) DOM SELECTION
   querySelectorAll returns a NodeList of matching elements
   - '.nums span' = all span elements inside .nums
===================================================== */
const nums = document.querySelectorAll(".nums span");
const counter = document.querySelector(".counter");
const finalMessage = document.querySelector(".final");
const replay = document.querySelector("#replay");

/* Start once on page load */
runAnimation();

/* =====================================================
   2) RESET FUNCTION
   This puts the DOM back to the initial state:
   - counter visible
   - final hidden
   - all number spans cleared of classes
   - first number gets class "in" to start animation
===================================================== */
function resetDOM() {
  /* Remove state classes that control visibility */
  counter.classList.remove("hide");
  finalMessage.classList.remove("show");

  /* Clear any "in" / "out" classes from every number */
  nums.forEach((num) => {
    num.classList.value = "";
  });

  /* Make the first number active again */
  nums[0].classList.add("in");
}

/* =====================================================
   3) MAIN ANIMATION LOGIC
   We attach an 'animationend' listener to each span.

   Why "animationend"?
   Because CSS animations run on their own timeline.
   JS waits until an animation finishes, then decides what to do next.
===================================================== */
function runAnimation() {
  nums.forEach((num, idx) => {
    /* Index of the last element (length - 1) */
    const nextToLast = nums.length - 1;

    num.addEventListener("animationend", (e) => {
      /* e.animationName is the keyframes name that ended */

      /* CASE 1: "goIn" finished and it's NOT the last number
         Meaning: this number successfully rotated into place,
         now we immediately rotate it out.
      */
      if (e.animationName === "goIn" && idx !== nextToLast) {
        num.classList.remove("in");
        num.classList.add("out");

        /* CASE 2: "goOut" finished and there IS a next span
           Meaning: current number left the stage,
           so we activate the next number by adding class "in".
        */
      } else if (e.animationName === "goOut" && num.nextElementSibling) {
        num.nextElementSibling.classList.add("in");

        /* CASE 3: otherwise we are done
           This triggers when the last number finishes its cycle.
           We hide the countdown and show the final message.
        */
      } else {
        counter.classList.add("hide");
        finalMessage.classList.add("show");
      }
    });
  });
}

/* =====================================================
   4) REPLAY BUTTON
   When clicked:
   - reset DOM to starting point
   - run the animation again
===================================================== */
replay.addEventListener("click", () => {
  resetDOM();
  runAnimation();
});