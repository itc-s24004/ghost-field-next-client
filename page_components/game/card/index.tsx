import Image from "next/image";

type Options = React.HTMLAttributes<HTMLDivElement> & {
    data: unknown
    mobile?: boolean;
};


export function UI_Card(props: Options) {
    return (
        <div>
            幅高さ固定
            <div>
                比率 50%
                <Image src={""} width={150} height={150} alt=""></Image>
            </div>
            <div>
                比率 50%
                <div>
                    比率 1
                    カード名 / 背景は属性の色
                </div>
                <div>
                    比率 5
                    横並び
                    <div>
                        比率 50%
                        防御コンポーネント詳細 / あれば
                        防御:
                        防御力
                    </div>
                    <div>
                        比率 50%
                        攻撃コンポーネント詳細 / あれば
                        攻撃:
                        ダメージ
                        命中率
                        回復:
                        回復量
                        等価交換:
                        売却:
                    </div>
                </div>
                <div>
                    比率 2
                    トラップコンポーネント詳細 / あれば
                    復活:
                    hp / mp / gold の回復量
                    攻撃:
                    ダメージ
                    命中率

                </div>
                <div>
                    比率 1
                    消費コスト / あれば | 売却価格
                </div>
            </div>
        </div>
    )
}