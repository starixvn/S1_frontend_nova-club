# Run Rewards Games Locally

```bash
yarn run web:rewards
```

## 各遊戲路徑

- http://localhost:3001/rewards/games/
- http://localhost:3001/rewards/games/fortune-cat
- http://localhost:3001/rewards/games/golden-cat
- http://localhost:3001/rewards/games/spin-and-win
- http://localhost:3001/rewards/games/mystery-drop
- http://localhost:3001/rewards/games/scratch-card

(參考:
[apps/rewards-next/src/app/launcher/page.tsx](apps/rewards-next/src/app/launcher/page.tsx)
)

## 開始遊戲

需要的 API 資料，可參考定義的型別，利用 RTK Query 的 queryFn 塞入資料即可開始
([packages/services/rewardApi.ts](packages/services/rewardApi.ts))

- /player_api/v1/getCoin
- /player_api/v1/coinRedemption
- /static_api/v1/getCoinRedemptionList

# Deploy Web Production

Run for first time only
`chmod +x deploy.sh`
then the next time deployment, execute
`./deploy.sh`

Next js Images srcset : (Resembles available images for browser to download)
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=16&q=75 16w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=32&q=75 32w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=48&q=75 48w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=64&q=75 64w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=96&q=75 96w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=128&q=75 128w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=256&q=75 256w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=384&q=75 384w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=640&q=75 640w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=750&q=75 750w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=828&q=75 828w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=1080&q=75 1080w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=1200&q=75 1200w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=1920&q=75 1920w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=2048&q=75 2048w,
/\_next/image?url=http%3A%2F%2Flocalhost%3A3000%2Fevent%2Fregistration%2F1t.png&w=3840&q=75 3840w

Next js Images Sizes : (Describe which image to use, sizing value is before devicePixelRatio being factored in)
More Info : https://medium.com/@woutervanderzee/responsive-images-with-srcset-and-sizes-fc434845e948
Example :
