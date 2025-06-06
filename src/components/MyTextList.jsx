import styles from "./MyTextList.module.css";
import { MyText } from "./MyText";

export function MyTextList() {
  const texts = [
    {
      title: "Lorem ipsum dolor sit amet",
     
    },
    {
      title: "Meu título 2",
      
    },
    {
      title: "Meu título 3",
      
    },
  ];

  return (
    <div>
      <h1 className={styles.title}>Meus textos</h1>
    <div className={styles.container}>
      {texts.map((text, index) => (
        <MyText key={index} title={`${index + 1}. ${text.title}`}>
          {text.text}
        </MyText>
      ))}
    </div>
    </div>
  );
}
