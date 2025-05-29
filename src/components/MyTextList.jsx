import styles from "./MyTextList.module.css";
import { MyText } from "./MyText";

export function MyTextList() {
  const texts = [
    {
      title: "Lorem ipsum dolor sit amet",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At similique voluptatem minima nam explicabo...",
    },
    {
      title: "Meu título 2",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum soluta cupiditate, nobis excepturi id nihil...",
    },
    {
      title: "Meu título 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, cumque, doloribus...",
    },
  ];

  return (
    <div className={styles.container}>
      {texts.map((text, index) => (
        <MyText key={index} title={`${index + 1}. ${text.title}`}>
          {text.text}
        </MyText>
      ))}
    </div>
  );
}
