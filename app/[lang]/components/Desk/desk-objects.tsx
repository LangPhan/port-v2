// Code-native objects keep the scene sharp without downloading a 3D asset pack.
export default function DeskObjects() {
  return (
    <div className="desk-props" aria-hidden="true">
      <div className="desk-mat">
        <span>GOOD THINGS TAKE SHAPE HERE.</span>
        <i>↗</i>
      </div>
      <div className="desk-keyboard">
        <div className="keyboard-keys">
          {Array.from({ length: 60 }, (_, i) => (
            <i
              key={i}
              className={i === 12 ? "key-orange" : i === 56 ? "key-space" : ""}
            >
              {i < 10
                ? String(i + 1).slice(-1)
                : i === 12
                  ? "esc"
                  : i === 56
                    ? ""
                    : "QWERTYUIOPASDFGHJKLZXCVBNM"[(i - 10) % 26]}
            </i>
          ))}
        </div>
      </div>
      <div className="desk-mug">
        <div className="mug-saucer" />
        <div className="mug-handle" />
        <div className="mug-body">
          <div className="coffee">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div className="desk-pencil">
        <span />
        <i />
      </div>
      <div className="desk-phone">
        <div className="phone-screen">
          <span>09:41</span>
          <i>♪</i>
          <b>
            less noise.
            <br />
            more focus.
          </b>
          <div>◀ &nbsp; Ⅱ &nbsp; ▶</div>
        </div>
      </div>
      <div className="desk-note">
        <span className="note-pin" />
        <span>
          make it
          <br />
          simple.
          <br />
          <em>make it matter.</em>
        </span>
        <i>✳</i>
      </div>
      <div className="desk-plant">
        <div className="plant-pot" />
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} style={{ "--leaf": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="desk-glasses">
        <i />
        <i />
        <span />
      </div>
      <div className="desk-paperclip" />
      <div className="desk-lamp">
        <div className="lamp-base" />
        <div className="lamp-arm arm-one" />
        <div className="lamp-arm arm-two" />
        <div className="lamp-joint" />
        <div className="lamp-shade">
          <i />
        </div>
        <div className="lamp-light" />
      </div>
      <div className="desk-card">
        <span>✳</span> curious by nature.
        <br />
        developer by craft.
      </div>
    </div>
  );
}
