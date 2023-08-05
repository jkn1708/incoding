import React, { useState } from "react";
import "./App.css";

function App() {
  //입력한 문자열
  const [str, setStr] = useState<string>("");

  const incodingAndDecoding = (value: string) => {
    //incoding ------------

    //문자 ->bit
    let arrBit = [];
    for (let i = 0; i < value.length; i++) {
      let bit = value.charCodeAt(i).toString(2);
      arrBit.push(bit);
    }
    const I_bit = arrBit.join("");

    //bit -> asc
    const numbyTwo = arrBit.join("");
    const I_asc = String.fromCharCode(...chunkSubstr(numbyTwo, 8));

    //asc -> base64
    const I_base64 = btoa(I_asc);

    //decoding  -------------

    //base64 -> asc
    const D_asc = atob(I_base64);
    //asc -> uft-16
    let arrbitFromAcs = [];
    for (let i = 0; i < D_asc.length; i++) {
      let bit = D_asc.charCodeAt(i).toString(2);
      if (bit.length < 8) {
        let len = 8 - bit.length;
        for (let i = 0; i < len; i++) {
          bit = "0" + bit;
        }
      }
      console.log(bit);

      arrbitFromAcs.push(bit);
    }

    const D_bit = arrbitFromAcs.join("");
    const D_utf16 = String.fromCharCode(...chunkSubstr(D_bit, 16));

    return { I_bit, I_asc, I_base64, D_asc, D_utf16 };
  };

  const chunkSubstr = (str: string, size: number) => {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = parseInt(str.substr(o, size), 2);
    }
    return chunks;
  };

  return (
    <div className="App">
      <div>입력</div>
      <textarea
        onChange={(e) => {
          setStr(e.target.value);
        }}
      ></textarea>
      <div>bits</div>
      <textarea value={incodingAndDecoding(str).I_bit}></textarea>
      <div>{`인코드: bits > ASCII`}</div>
      <textarea value={incodingAndDecoding(str).I_asc}></textarea>
      <div>{`인코드: ASCII > Base64`}</div>
      <textarea value={incodingAndDecoding(str).I_base64}></textarea>
      <div>{`디코드: Base64 > ASCII`}</div>
      <textarea value={incodingAndDecoding(str).D_asc}></textarea>
      <div>{`디코드: ASCII > UTF-16`}</div>
      <textarea value={incodingAndDecoding(str).D_utf16}></textarea>
    </div>
  );
}

export default App;
