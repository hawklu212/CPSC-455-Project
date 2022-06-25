import Title from "./TitleDiv";
import TopDiv from "./top-components/TopDiv";
import BottomDiv from "./bottom-components/BottomDiv";
import Navigation from "./Navigation";
export default function MainContainer() {
  return (
    <div className="yellow-2"
         container
         spacing={0}
         direction="column"
         alignItems="center"
         justifyContent="center"
         style={{ minHeight: "100vh" }}>
      <Navigation></Navigation>

      <div>
        <TopDiv />
      </div>
      <div>
        <BottomDiv />
      </div>
    </div>
  );
}
