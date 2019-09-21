function isHovered (star, hovered) {
  return (hovered.indexOf(star) !== -1)
}

function getClosestFiveFromBelow (number) {
  return number - (number % 5)
}

function refillStars () {
  const hovered = [...document.querySelectorAll('.star-icon-empty:hover'), ...document.querySelectorAll('.star-icon-full:hover')]
  if (hovered.length > 0) {
    const emptyStars = [...document.querySelectorAll('.star-icon-empty')]
    let indexOfHoveredStar = -1

    emptyStars.forEach((star, index) => {
      if (isHovered(star, hovered)) {
        indexOfHoveredStar = index
      }
    })
    if (indexOfHoveredStar !== -1) {
      for (let i = getClosestFiveFromBelow(indexOfHoveredStar); i <= indexOfHoveredStar; i++) {
        emptyStars[i].className = 'star-icon-full'
      }
    }
  } else {
    const fullStars = [...document.querySelectorAll('.star-icon-full')]
    fullStars.forEach((fullStar) => {
      fullStar.className = 'star-icon-empty'
    })
  }
}

setInterval(refillStars, 10)
