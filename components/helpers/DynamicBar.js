import Svg, { Rect } from 'react-native-svg';
import React, { View } from 'react-native';
const DynamicBar = ({ segment1, segment2, style, height}) => {
  const total = segment1 + segment2;
const normalizedSegment1 = (segment1 / total) * 100;
const normalizedSegment2 = (segment2 / total) * 100;
  return (
    <View style={style}>
      <Svg height="5" width="100%">
        <Rect x="0%" y="0" width={`${normalizedSegment1}%`} height={height} fill="#95A4E5" />
        <Rect x={`${normalizedSegment1}%`} y="0" width={`${normalizedSegment2}%`} height={height} fill="#686B72" />
      </Svg>
    </View>
  );
};
export{DynamicBar};