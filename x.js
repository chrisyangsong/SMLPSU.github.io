// 假设你已经获取了json文件中的数据，并把它存储在一个变量中，例如data
// 假设data是一个数组，每个元素是一个marker对象，包含坐标和其他属性
// 创建一个空数组来存储marker实例
var markers = [];

// 用一个循环来遍历data数组中的每个元素
for (var i = 0; i < data.length; i++) {
  // 获取当前元素，也就是当前的marker对象
  var marker = data[i];

  // 从marker对象中获取坐标和其他属性
  var lat = marker.coordinates.lat;
  var lng = marker.coordinates.lng;
  var name = marker.name;

  // 创建一个google.maps.LatLng对象，表示marker的位置
  var position = new google.maps.LatLng(lat, lng);

  // 创建一个google.maps.Marker实例，表示marker在地图上的图标
  var icon = new google.maps.Marker({
    position: position,
    map: map,
    title: name
  });

  // 把icon实例添加到markers数组中
  markers.push(icon);
}
