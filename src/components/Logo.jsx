import Svg, { G, Polygon, Text as SvgText, Rect } from 'react-native-svg';

export default function Logo({ width = 240 }) {
  const height = (width * 56) / 240;

  return (
    <Svg width={width} height={height} viewBox="0 0 240 56">
      <G transform="translate(6,4)">
        <Polygon points="22,2 42,13 22,24 2,13" fill="#4D86F0" />
        <Polygon points="2,13 22,24 22,46 2,35" fill="#002F87" />
        <Polygon points="42,13 22,24 22,46 42,35" fill="#0045C4" />
        <Polygon points="12,7.5 32,18.5 32,22 12,11" fill="#FFFFFF" opacity={0.9} />
      </G>
      <SvgText x="58" y="30" fontSize="22" fontWeight="800" fill="#0B1F44">
        StockHub
      </SvgText>
      <SvgText x="59" y="46" fontSize="11" fontWeight="700" fill="#0045C4" letterSpacing="5">
        PRO
      </SvgText>
      <Rect x="92" y="41" width="60" height="2" rx="1" fill="#0045C4" opacity={0.5} />
    </Svg>
  );
}