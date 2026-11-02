import { Text } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";

export default function AddItem() {
    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <Text>Remover item (em construção)</Text>
        </ScreenContainer>
    );
}