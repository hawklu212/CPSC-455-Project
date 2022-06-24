import Title from "./TitleDiv";
import TopDiv from "./top-components/TopDiv";
import BottomDiv from "./bottom-components/BottomDiv";
import Navigation from "./Navigation";
export default function MainContainer() {
  return (
    <div>
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
