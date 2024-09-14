// Define the default chart options
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  // Define animation settings
  animation: {
    duration: 2000,
    easing: 'easeInOutQuint',
    animateRotate: true,
  },
  // Define plugin settings
  plugins: {
    title: {
      display: true,
      text: 'Title',
    }
  },
  // Define title settings
  title: {
    display: true,
    fontSize: 20,
    position: 'top',
  },
  // Define legend settings
  legend: {
    display: true,
    position: 'bottom',
    align: 'start'
  },
  // Define tooltip settings
  tooltips: {
    enabled: true,
    mode: 'nearest',
    intersect: false
  }
}