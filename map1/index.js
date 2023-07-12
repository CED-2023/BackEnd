let map, infoWindow
let start = document.querySelector('.start')
let end = document.querySelector('.end')

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos)
        map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: pos.lat, lng: pos.lng },
          zoom: 15,
        });
        infoWindow = new google.maps.InfoWindow();
        infoWindow.setPosition(pos);
        infoWindow.setContent("You are here");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function confirm1(){
  const inputBox = document.querySelectorAll('.time')[0]
  // 获取input输入框中的值
  let inputVal = inputBox.value;
  if(inputVal){
    const distance = 1.3*inputVal*3600
    console.log(distance)
  }else{
    alert('请在input输入框中填点东西');
  }
  
}
function reset1(){
  console.log('2')
}
function getInputVal(){
  
}

function roadline(startlocaltion,time){

const distance = 1.3*time*60


}

// 地球半径（单位：千米）
const EARTH_RADIUS = 6371;

// 计算两个经纬度之间的距离（单位：千米）
function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS * c;

  return distance;
}

// 将角度转换为弧度
function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

// 生成随机的经度和纬度
function generateRandomLocation(latitude, longitude, maxDistance) {
  // 将距离转换为角度
  const distanceInDegrees = maxDistance / EARTH_RADIUS;

  // 生成随机的方向角度
  const direction = Math.random() * 360;

  // 计算新位置的纬度和经度
  const newLatitude = latitude + (distanceInDegrees * Math.cos(deg2rad(direction)));
  const newLongitude = longitude + (distanceInDegrees * Math.sin(deg2rad(direction)));

  return [newLatitude, newLongitude];
}

// 示例用法
const startLatitude = 33.9555802; // 起始位置纬度
const startLongitude = 131.2729588; // 起始位置经度
const maxDistance = 1; // 可行走的最大距离（单位：千米）

const targetLocation = generateRandomLocation(startLatitude, startLongitude, maxDistance);

console.log('終点の緯度:', targetLocation[0]);
console.log('終点の経度:', targetLocation[1]);

window.initMap = initMap;
window.confirm1 = confirm1
window.reset1 = reset1