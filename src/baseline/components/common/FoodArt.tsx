import { useId } from "react";
import type { FoodKind } from "../../types";
export function FoodArt({
  kind,
  className = "",
  background = false,
}: {
  kind: FoodKind;
  className?: string;
  background?: boolean;
}) {
  const id = useId();
  return (
    <svg
      className={`food-art ${className}`}
      viewBox="0 0 160 124"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bread`} x2="0" y2="1">
          <stop stopColor="#ffc564" />
          <stop offset="1" stopColor="#d78426" />
        </linearGradient>
        <linearGradient id={`${id}-sauce`} x2="0" y2="1">
          <stop stopColor="#f78342" />
          <stop offset="1" stopColor="#b83b27" />
        </linearGradient>
        <linearGradient id={`${id}-plate`} x2="0" y2="1">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#d4e0e6" />
        </linearGradient>
      </defs>
      {background && (
        <rect
          width="160"
          height="124"
          fill={
            kind === "coffee"
              ? "#e6e9dc"
              : kind === "sushi"
                ? "#dfedf0"
                : "#f7e9d8"
          }
        />
      )}
      <ellipse cx="81" cy="105" rx="58" ry="9" fill="#2f374c" opacity=".13" />
      {kind === "coffee" ? (
        <>
          <ellipse cx="79" cy="100" rx="48" ry="12" fill="#edf3f4" />
          <path d="M44 39h69l-6 53c-2 16-53 16-56 0z" fill="#36bcb6" />
          <path
            d="M112 50c32-2 31 39-5 33"
            fill="none"
            stroke="#219b9b"
            strokeWidth="10"
          />
          <ellipse cx="78" cy="39" rx="35" ry="10" fill="#fffcf5" />
          <ellipse cx="78" cy="39" rx="29" ry="7" fill="#644432" />
          <path
            d="M70 41q-12-10 0-13t0-13m19 26q-12-10 0-13"
            stroke="#e8d4bd"
            strokeWidth="3"
            fill="none"
          />
          <rect
            x="21"
            y="73"
            width="28"
            height="20"
            rx="8"
            fill="#dda760"
            transform="rotate(-14 35 84)"
          />
          <circle cx="29" cy="82" r="2" fill="#835232" />
          <circle cx="41" cy="79" r="2" fill="#835232" />
        </>
      ) : (
        <>
          <ellipse cx="80" cy="87" rx="64" ry="26" fill={`url(#${id}-plate)`} />
          <ellipse
            cx="80"
            cy="83"
            rx="55"
            ry="22"
            fill="#fbfbf5"
            stroke="#d8dbd6"
            strokeWidth="2"
          />
          {kind === "pizza" ? (
            <>
              <ellipse cx="80" cy="73" rx="52" ry="29" fill="#bd772d" />
              <ellipse
                cx="80"
                cy="68"
                rx="52"
                ry="29"
                fill={`url(#${id}-bread)`}
              />
              <ellipse
                cx="80"
                cy="66"
                rx="45"
                ry="24"
                fill="#f7cb58"
                stroke="#de9840"
                strokeWidth="3"
              />
              {[
                [58, 57],
                [86, 50],
                [109, 62],
                [82, 72],
                [57, 77],
                [108, 79],
              ].map(([x, y], i) => (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx="7"
                  ry="5"
                  fill="#bd473d"
                  stroke="#8b382d"
                  strokeWidth="1"
                />
              ))}
              {[
                [68, 49],
                [99, 51],
                [72, 82],
                [111, 68],
                [43, 65],
              ].map(([x, y], i) => (
                <path
                  key={i}
                  d={`M${x} ${y}q7-4 9 3`}
                  stroke="#469e5a"
                  strokeWidth="3"
                  fill="none"
                />
              ))}
              <path
                d="M80 43v47m-38-33 77 21M47 84l67-32"
                stroke="#b98742"
                strokeWidth="1"
                opacity=".6"
              />
            </>
          ) : kind === "burger" ? (
            <>
              <path d="M40 88q40 30 81 0v-9H40z" fill={`url(#${id}-bread)`} />
              <path d="M39 77q39-8 84 0v9H39z" fill="#6d3727" />
              <path
                d="M36 72l12-7 12 7 15-7 14 8 15-8 20 7v8l-15-3-12 5-21-6-18 4-16-5z"
                fill="#6eb34a"
              />
              <path d="m39 65 22-5 31 3 30-3-7 14-23-8-27 10z" fill="#f3c438" />
              <path d="M39 57q41-17 83 0v10H39z" fill="#c34931" />
              <path d="M38 57c0-49 89-49 86 0z" fill={`url(#${id}-bread)`} />
              {[
                [56, 40],
                [74, 31],
                [93, 37],
                [108, 46],
                [80, 48],
              ].map(([x, y], i) => (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx="3"
                  ry="1"
                  fill="#fff0bd"
                  transform={`rotate(-20 ${x} ${y})`}
                />
              ))}
            </>
          ) : kind === "sushi" ? (
            <>
              {[
                [46, 66],
                [84, 57],
                [114, 75],
                [76, 84],
              ].map(([x, y], i) => (
                <g
                  key={i}
                  transform={`translate(${x} ${y}) rotate(${i % 2 ? 14 : -8})`}
                >
                  <rect
                    x="-19"
                    y="-4"
                    width="38"
                    height="21"
                    rx="8"
                    fill="#ecede4"
                  />
                  <rect
                    x="-21"
                    y="-10"
                    width="42"
                    height="16"
                    rx="5"
                    fill={i === 1 ? "#eeb454" : "#ef8162"}
                  />
                  {[-13, -2, 9].map((a) => (
                    <path
                      key={a}
                      d={`m${a} -9 7 15`}
                      stroke="#ffd1ae"
                      strokeWidth="2"
                    />
                  ))}
                </g>
              ))}
              <path d="M26 79q-12-15 1-20l10 16" fill="#78b45b" />
              <path d="M116 49q10-17 23 0l-5 10z" fill="#edb49b" />
            </>
          ) : kind === "noodles" ? (
            <>
              <path d="M28 66h106c-5 49-96 49-106 0" fill="#b73237" />
              <ellipse cx="81" cy="66" rx="53" ry="22" fill="#e6503a" />
              <ellipse cx="81" cy="64" rx="46" ry="17" fill="#52342c" />
              {Array.from({ length: 10 }, (_, i) => (
                <path
                  key={i}
                  d={`M${46 + i * 6} 57q-16 11 3 16t4-14`}
                  fill="none"
                  stroke="#ae7842"
                  strokeWidth="3"
                />
              ))}
              <path
                d="m92 31-36 44m48-40-39 45"
                stroke="#d3a471"
                strokeWidth="4"
              />
              <path
                d="M51 60q20-16 27-4"
                stroke="#65a554"
                strokeWidth="6"
                fill="none"
              />
              <circle cx="107" cy="62" r="5" fill="#d75635" />
            </>
          ) : kind === "dumplings" ? (
            <>
              {[
                [53, 70],
                [89, 55],
                [111, 77],
                [77, 86],
              ].map(([x, y], i) => (
                <g
                  key={i}
                  transform={`translate(${x} ${y}) rotate(${i * 15 - 20})`}
                >
                  <path
                    d="M-20 5Q-17-34 20 5q-20 16-40 0"
                    fill="#f5dfad"
                    stroke="#d0aa74"
                    strokeWidth="2"
                  />
                  {[-12, -5, 2, 9].map((a) => (
                    <path
                      key={a}
                      d={`M${a} -9q-6 7-3 14`}
                      stroke="#d6b58a"
                      strokeWidth="2"
                      fill="none"
                    />
                  ))}
                </g>
              ))}
              <path d="M118 46l8-7 5 9" fill="#54a35f" />
            </>
          ) : kind === "tteokbokki" ? (
            <>
              <path d="M29 67h103l-13 27q-35 20-77 0z" fill="#f5f1e7" />
              <ellipse
                cx="80"
                cy="68"
                rx="51"
                ry="24"
                fill="#c74231"
                stroke="#e9dccc"
                strokeWidth="4"
              />
              {[
                [49, 59],
                [77, 49],
                [98, 61],
                [58, 82],
                [85, 78],
                [111, 78],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x - 6}
                  y={y - 7}
                  width="24"
                  height="12"
                  rx="6"
                  fill={`url(#${id}-sauce)`}
                  stroke="#ef985b"
                  strokeWidth="1"
                  transform={`rotate(${i * 33} ${x} ${y})`}
                />
              ))}
              <ellipse cx="89" cy="63" rx="14" ry="11" fill="#fff0cb" />
              <ellipse cx="89" cy="63" rx="7" ry="6" fill="#ffc93f" />
              <path
                d="m51 65 15 4m18 14 12 2"
                stroke="#64a752"
                strokeWidth="3"
              />
            </>
          ) : kind === "chicken" ? (
            <>
              {[
                [55, 77],
                [89, 59],
                [109, 79],
                [75, 84],
              ].map(([x, y], i) => (
                <g
                  key={i}
                  transform={`translate(${x} ${y}) rotate(${i * 29 - 25})`}
                >
                  <rect
                    x="-5"
                    y="-1"
                    width="28"
                    height="9"
                    rx="4"
                    fill="#f3e1bd"
                  />
                  <circle cx="25" cy="1" r="6" fill="#fff0d8" />
                  <circle cx="25" cy="8" r="5" fill="#fff0d8" />
                  <path
                    d="M-17-12c-18 7-12 30 3 34 20 2 30-25 9-33z"
                    fill={`url(#${id}-bread)`}
                    stroke="#b87528"
                    strokeWidth="2"
                  />
                  {[-11, -4, 3].map((a) => (
                    <circle key={a} cx={a} cy={a + 6} r="2" fill="#d69137" />
                  ))}
                </g>
              ))}
              <path d="M29 68q-14-19 7-21l9 10" fill="#63aa55" />
            </>
          ) : (
            <>
              <ellipse
                cx="60"
                cy="70"
                rx="32"
                ry="21"
                fill="#edf0e4"
                stroke="#dddccd"
                strokeWidth="2"
              />
              <path d="M33 67q26-44 54 0z" fill="#f8faf0" />
              {[
                [45, 61],
                [58, 56],
                [71, 63],
                [52, 70],
                [74, 73],
              ].map(([x, y], i) => (
                <path
                  key={i}
                  d={`m${x} ${y} 4 1`}
                  stroke="#dbdfd0"
                  strokeWidth="2"
                />
              ))}
              <path
                d="M88 55q38-12 38 11l-12 22-30-3z"
                fill={kind === "steak" ? "#91513d" : "#b65633"}
                stroke="#8e4130"
                strokeWidth="2"
              />
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`m${91 + i * 8} 58-7 22`}
                  stroke={kind === "steak" ? "#d1875b" : "#dd8d4c"}
                  strokeWidth="2"
                />
              ))}
              <path
                d="M109 48q-1-23 13-10 20-10 19 7-14 15-32 3"
                fill="#5c9e53"
              />
              <ellipse cx="125" cy="78" rx="9" ry="6" fill="#ed7057" />
              <ellipse cx="122" cy="78" rx="3" ry="2" fill="#ffd197" />
            </>
          )}
        </>
      )}
    </svg>
  );
}
