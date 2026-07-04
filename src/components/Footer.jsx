import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <p>Designed & built by <b>{profile.name}</b> · React · Three.js · {new Date().getFullYear()}</p>
      <p className="hint">psst… try typing my first name anywhere on this page</p>
    </footer>
  )
}
