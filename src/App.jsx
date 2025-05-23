import "./styles/theme.css";
import "./styles/global.css";
import { MyText } from "./components/MyText";

export default function App() {
  //React Fragment
  return (
    <>
      <MyText title="Meu titulo 1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At similique
        voluptatem minima nam explicabo. Modi suscipit ut obcaecati consequuntur
        porro molestias, temporibus vero iste perspiciatis aperiam ipsam, soluta
        et error.
      </MyText>
      <MyText title="Meu título 2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum soluta
        cupiditate, nobis excepturi id nihil asperiores exercitationem molestiae
        quia accusamus praesentium debitis voluptate corporis, officiis,
        nesciunt culpa iste dignissimos odio!
      </MyText>
      <MyText title="Meu título 3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatibus, cumque, doloribus, voluptates quisquam voluptatibus
        voluptatibus, cumque, doloribus, voluptates quisquam voluptatibus,
        cumque, doloribus, voluptates quisquam voluptatibus, cumque, doloribus
      </MyText>
    </>
  );
}
// export default function App() {
