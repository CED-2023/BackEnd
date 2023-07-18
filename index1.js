var pos = {}
var inputVal
var speed
let m1
const EARTH_RADIUS = 6371000 // 地球半径（单位：千米）
var startLatitude // 起始位置纬度
var startLongitude // 起始位置经度

const marker = new Array()
const locations = new Array()
const lat = new Array()
const lng = new Array()

function initMap() {}

function mapDisplay() {
  navigator.geolocation.getCurrentPosition(
    function success(position) {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      startLatitude = lat // 起始位置纬度
      startLongitude = lng // 起始位置经度
      pos = { lat, lng }
      console.log(startLatitude, startLongitude)
      return lat, lng
      // 使用 latitude 和 longitude 做些什么
    },
    () => {
      handleLocationError(true, infoWindow, map.getCenter())
    }
  )
  if (Object.keys(pos).length) {
    console.log(Object.keys(pos).length)
    return pos
  }
}

function getInputVal() {
  var div1 = document.getElementById("div1");
  var div2 = document.getElementById("div2");
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: pos.lat, lng: pos.lng },
    zoom: 15,
  })
  const marker1 = new google.maps.Marker({
    position: { lat: pos.lat, lng: pos.lng },
    map: map,
    icon: 'icon.png',
  })
  const inputBox = document.querySelectorAll('.input-box')[0]
  inputVal = inputBox.value
  const maxDistance = speed * inputVal * 3600 // 可行走的最大距离（单位：米）
  for (let i = 1; i < 6; i++) {
    const targetLocation = generateRandomLocation(
      startLatitude,
      startLongitude,
      maxDistance
    )
    lat[i] = targetLocation[0].toFixed(6)
    lng[i] = targetLocation[1].toFixed(6)
    locations[i] = {
      lat: +lat[i],
      lng: +lng[i],
    }
    console.log(locations[i])
    console.log(locations)
    console.log('終点の緯度:', +lat[i])
    console.log('終点の経度:', +lng[i])
    //window.location.href = "https://maps.google.com/maps?q=" + lat1 + "," + lng1;
    marker[i] = new google.maps.Marker({
      position: locations[i],
      map: map,
    })
    marker[i].addListener('click', function () {
      console.log(pos, locations[i])
      console.log(i)
      function createNewArray(arr, selectedElement) {
        var newArray = arr.filter(function (element) {
          return element !== selectedElement
        })
        return newArray
      }

      // 示例用法
      var arr = [1, 2, 3, 4, 5]
      var selectedElement = i
      var newArray = createNewArray(arr, selectedElement)
      console.log(newArray)
      for (let n = 0; n < newArray.length; n++) {
        console.log(n)
        marker[newArray[n]].setMap(null)
      }
      var directionsService = new google.maps.DirectionsService()
      var request = {
        origin: pos, // 起点
        destination: locations[i], // 终点
        travelMode: 'WALKING', // DRIVING,BICYCLING行驶模式（如驾车、步行、公交等）
      }
      directionsService.route(request, function (response, status) {
        if (status === 'OK') {
          // 路线计算成功，可以处理响应结果
          var directionsRenderer = new google.maps.DirectionsRenderer()
          directionsRenderer.setDirections(response)
          directionsRenderer.setMap(map)
        } else {
          // 路线计算失败，处理错误情况
          console.log('Error: ' + status)
        }
      })
    })
  }
}

// 计算两个经纬度之间的距离（单位：米）
function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = EARTH_RADIUS * c * 1000

  return distance
}

// 将角度转换为弧度
function deg2rad(degrees) {
  return degrees * (Math.PI / 180)
}

// 生成随机的经度和纬度
function generateRandomLocation(latitude, longitude, maxDistance) {
  // 将距离转换为角度
  const distanceInDegrees = maxDistance / EARTH_RADIUS

  // 生成随机的方向角度
  const direction = Math.random() * 360

  // 计算新位置的纬度和经度
  const newLatitude =
    latitude + distanceInDegrees * Math.cos(deg2rad(direction))
  const newLongitude =
    longitude + distanceInDegrees * Math.sin(deg2rad(direction))

  return [newLatitude, newLongitude]
}

mapDisplay()

function walking(){
  console.log('1.4')
 speed= 1.4
}
function bike(){
  console.log('5.5')
  speed= 5.5
}
function car(){
  console.log('12')
  speed= 12
}