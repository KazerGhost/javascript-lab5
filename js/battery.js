/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
// STEP 1d: Create an image element for RoboHash and append it to the battery section
const batteryImage = document.createElement('img');
batteryImage.id = 'battery-image';
document.querySelector('#battery').appendChild(batteryImage);

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    console.log(battery);
    // STEP 3b: Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging";
    }
    // STEP 3c: Update the charge level
    const batteryPercentage = Math.round(battery.level * 100);
    chargeLevel.textContent = batteryPercentage + "%";
    chargeMeter.value = batteryPercentage;

    // STEP 3d: Update the image source with the RoboHash API
    batteryImage.src = `https://robohash.org/${batteryPercentage}.png`;
    batteryImage.alt = `Battery percentage image for ${batteryPercentage}%`;
}

// STEP 2a: Using the getBattery() method of the navigator object,
navigator.getBattery().then(battery => {
    // STEP 2b: See what the battery object contains
    console.log(battery);
    // STEP 3e: Update the battery information when the promise resolves
    updateBatteryStatus(battery);
    // STEP 4a: Event listener for changes to the charging status
    battery.addEventListener("chargingchange", function () {
        updateBatteryStatus(battery);
    })
    // STEP 4b: Event listener for changes to the charge level
    battery.addEventListener("levelchange", function () {
        updateBatteryStatus(battery);
    })
})
