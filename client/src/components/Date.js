import React from "react";

export default function Date() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  return (
      <h1>{date}</h1>
  )
}