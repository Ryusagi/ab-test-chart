export interface VariationSelectProps {
    variations: string[];
    selected: string[];
    onChange: (variations: string[]) => void;
}