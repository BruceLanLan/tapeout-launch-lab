# Launchpad 机制研究 · TapeHub vs 赌场盘

TapeOut Research · [@BruceBlue](https://x.com/BruceBlue) · 2026-09  
对照对象：Pump.fun、Four.meme、Flap、Pons、LONG、Virtuals、TapeHub  
本文是机制对照，不是收益预测，也不是官方文档。

**模拟器：** [brucelanlan.github.io](https://brucelanlan.github.io/)  
**仓库：** [BruceLanLan/tapeout-launch-lab](https://github.com/BruceLanLan/tapeout-launch-lab)

---

## 一句话

普通 Launchpad 发的是 Token。TapeOut 想发出来的，是一套还能继续 Build 的生产系统。TapeHub 是这套系统上被简化过的发射口：买晶体管、等毕业、5 个合成一台矿机。电路和 PoD 是另一扇门。

---

## 1. 赌场盘在发什么

Pump.fun、Four.meme、Flap、Pons 的生命周期几乎同一条：

**创建 Token → Bonding Curve 买入 → 达标毕业 → AMM 流动性。**

这条路解决的是：怎么把一个 Token 在几十分钟里定价完。Four.meme 已经把 BNB Chain 上的发行、交易、深度、用户习惯做成了规模。问题不在「发得不够快」，在供给函数。

| 平台 | 链 | 毕业 | T0 流通 | 团队预留 | LP |
|---|---|---|---|---|---|
| Pump.fun | Solana | 曲线买满 → PumpSwap | ~100% | 协议不锁，dev 可买可砸 | 毕业 LP 烧毁 |
| Four.meme | BNB Chain | 曲线买满 → PancakeSwap | ~100%（约 80% 曲线 + 20% LP） | 创建时可同笔买入 | 约 18 BNB + 20% 供给 |
| Flap | BSC / 其他 | 曲线填满迁 DEX | ~100% | 可配税与 vault | 填满后迁池 |
| Pons | Robinhood Chain | V2 curve → Uni v4 | ~100% | 无预留；creator 吃交易费 | 毕业永久锁定 |
| LONG | Robinhood Chain | 直接与股票代币组池 | ~100% | ticker 预订 | NVDA / AAPL 做 quote |
| Virtuals | Base | 收到定额 VIRTUAL → Uni v2 | 高（Pegasus 约 95% 进 LP） | Unicorn 可留团队 | 锁 10 年 |
| **TapeHub** | **BNB Chain** | **晶体管募满 / 超时半额** | **约 5%** | **协议禁止预留** | **募资 99% + 5% 代币，永久锁** |

共同结构：价格发现和筹码释放叠在同一分钟。毕业以后，几乎全部供给已经在市场上。LP 锁不锁、税高不高，改的是抽池和狙击，不改「第一天就能砸完」这件事。

Virtuals 防抽池（LP 锁 10 年），不防高流通。Flap / LONG 换的是报价资产（股票代币、分红），meme 侧照样可以一天放完。

---

## 2. TapeHub 实际在跑的规则

先讲现在的规则，再讲畅想。

1. **发起人不能预留。** 没有团队仓、没有隐藏解锁。
2. **用户买的是晶体管，不是立刻能砸的全部筹码。** 募集达标毕业（满额立即，或超时后按半额规则）。
3. **毕业时大约 5% 代币 + 募资约 99% 进永久锁仓 LP。** 底池锁死。
4. **95% 供给必须靠矿机挖出来。** 每 5 个晶体管合成一台矿机。9 段减半，跨度 **1908 天**。
5. **协议手续费可以回流，与 BEM 的回购 / 销毁发生关系。** 但 NAND/LATCH 消耗 ≠ BEM 消耗，不要收成一句「通缩」。

减半排放（约 9.5 亿可挖，每段约等量）：

| 段 | 天数 | 累计日 |
|---|---|---|
| 1 | 3 | 0–3 |
| 2 | 5 | 3–8 |
| 3 | 10 | 8–18 |
| 4 | 30 | 18–48 |
| 5 | 60 | 48–108 |
| 6 | 120 | 108–228 |
| 7 | 240 | 228–468 |
| 8 | 480 | 468–948 |
| 9 | 960 | 948–1908 |

买的是产币权。矿工每天兑现，是可计算的卖压，不是开盘瞬间的 100% 流通。盘口薄的时候，这笔卖压仍会把价格压下去——所以「现状慢熊」是默认路径，不是 bug。深度上来以后，同一套排放从打穿盘口，变成可吸收的通胀。

---

## 3. 两扇门，不要混着讲

复杂产品真正的沟通难题，不是规则写不清楚，是把所有规则一次讲完。

**TapeHub · Launch（第一次来参加发射）**

Mint 晶体管 → 毕业 → 5 个合成矿机 → 按减半表挖这个项目的代币。

不画电路，不对 PoD 题目。第一屏三句话：买到的是晶体管；池子锁死；矿机怎么合成。

**TapeOut Protocol · Build（想自己造机器）**

NAND / LATCH 是生产资料。自己设计电路、自己流片、自己去迎合 PoD，元件被真实消耗，生成 Circuit。那是 Builder 路径，不是 Launchpad 用户的必考题。

完整生命周期更像：

**Launch → Mint Components → Build → Tape Out → Circuit → PoD / Application / DeWEB**

和 meme 盘不是同一条生命。Launch 只是第一天。真正重要的是这些资产被拿去 Build 了什么。

---

## 4. 为什么这和 Bancor / DeFi Summer 像

2017 年 Bancor 的 Smart Token 不是「发一个盘口」，是把铸造、销毁和储备比率写成协议。后来的人记得它的价格，不记得它的标准：连续供给 + 储备约束，让流动性成为机制，而不是一场拍卖。

2020 DeFi Summer 的流动性挖矿也是同一类时间结构：奖励按块释放，卖压被摊到月和季，而不是第一小时。很多盘照样归零。活下来的，是排放函数和真实需求对上的那一批。

TapeHub 站在这条线上：

- 赌场盘 = 注意力拍卖。Proof of Attention。
- TapeHub = 产币权 + 减半表。时间被写进供给。
- 下一步如果接上 Circuit / Application，才接近 Proof of Build。那是畅想，不是已经上线的毕业条件。

机制保护的是下限，不是上限。没有需求，1908 天照样是慢熊。有需求，筹码不会在开盘当天被砸完。

---

## 5. 和 Four.meme 的分工

发行、交易、深度、用户习惯，Four.meme 已经验证过了。TapeOut 没必要重做一套赌场盘。

更合理的分工：

- TapeOut 出协议原生玩法（晶体管、矿机、减半、禁止预留）。
- Four.meme / OpenFour 出成熟的发行基础设施和市场经验。

OpenFour 把 Launch 拆成 Token、Vault、Curve、Trade、Migrate、Custom Data，理论上可以给 TapeOut 做一个原生 Preset。传统毕业看募了多少钱；未来甚至可以试：多少晶体管被真正用掉、多少 Circuit 被 Tape Out、有没有 Application / DeWEB 上线。

这叫 **Proof of Build**：不只奖励 Capital，也奖励 Creation。是希望，不是已经上线的功能。合作也是在谈的方向，不是已经签完的合同。

模拟器里的「TapeHub + Four.meme」路径，只改一件事：**供给函数不变，交易层变厚。** 矿工抛压从打穿薄盘口，变成可被买盘吸收的通胀。

---

## 6. 模拟器在算什么

同一笔注意力，七条供给函数。价格全部对齐到首次成交 = 1.0x。

四个预设：

| 预设 | 在看什么 |
|---|---|
| 秒盘对照 | 24 小时。赌场盘分钟级见顶、数小时回吐。TapeHub 几乎不动。 |
| 现状慢熊 | 普通项目、薄流动性、矿工兑现。TapeHub 默认路径。 |
| 未来主叙事 | 更好的项目源 + Four.meme 深度。排放还在，盘口接得住。 |
| 五年减半 | 1908 天。排放减速后，需求能不能接住。 |

回购销毁推进价格，但按时间摊开，不做成每隔一两天插一根针。薄池抬得更明显，深池（TapeHub + Four.meme）同样的买盘被接住，斜率更缓。供给仍是 5% / 95%。

对数时间轴是为了让「前 30 分钟的尖峰」和「后面 1908 天」出现在同一张图上。否则赌场盘的暴涨在长周期里会被压成一根针。

数字是机制对照。不是这个 CA 明天的价格。

---

## 7. DeWEB：同一条设计原则

协议可以复杂，入口必须浅。DeWEB 用的是同一条原则，也是 TapeOut 协议层最值得讲清楚的能力：

1. **开发者**把网站写到 BNB Chain。一次上链，永久免费存，不再按月交托管。
2. **访问的人**不需要 Token、不需要钱包、不需要签名、不需要 gas，甚至不需要知道这是区块链。打开方式和今天的网站一样。多出来的是 Verification：文件是链上公开数据，客户端可以核对你看到的就是链上那一份。

用户体验越来越 Web2，底层可信度越来越 Web3。如果这条做大，BNB Chain 承载的就不只是金融资产，而是 Internet Applications。

---

## 8. 下一代 Launchpad 不该再卷谁发得更快

Token 已经太容易发了。Builder 最缺的通常不是 Idea，是 Idea 到 Product 中间那条路：

**Build → Verify → Launch → Distribution → Revenue**

断任何一环，人就会走。所以值得做的实验是（均为畅想）：

1. **Machine Launch。** 发的不只是 Token，是 Processor + Components + Container + DeWEB + 代币经济。
2. **Proof of Build。** 市值、成交之外，加上：有多少人在 Build、多少元件被用掉、有没有真实 Application。
3. **DeWEB-native Launch。** 第一天除了 Token，同时有一个写在 BNB Chain 上的网站。用户看到的不是一张图和一个 CA，是能打开的产品。

走到这里，发射台就不再是 Token Launcher，而是 Builder Discovery Platform。

---

## 怎么读这个仓库

- [`index.html`](index.html) + [`app.js`](app.js)：可交互对照。
- 本文件：机制研究正文。
- 模拟器默认打开「未来主叙事」。要看赌场盘怎么死，切「秒盘对照」。

非正式官方产品。与 TapeOut Protocol / Four.meme 无隶属关系。
