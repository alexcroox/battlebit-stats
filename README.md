# BattleBit Stats

https://battlebitstats.com

Interactive maps, weapons and (hopefully in the future) player stats for the [Battle Bit game](https://store.steampowered.com/app/671860/BattleBit_Remastered/)

## Contributing

### Maps

[Browse the current list of maps](https://github.com/alexcroox/battlebit-stats/blob/main/src/lib/map-config.ts)

If you find a high resolution version of a map (around 4000px wide) please submit a PR adding it to the [map-tiler/maps-raw](https://github.com/alexcroox/battlebit-stats/tree/main/map-tiler/maps-raw) folder 

If you are unfamiliar with git workflows then feel free to [submit it with a new Issue](https://github.com/alexcroox/battlebit-stats/issues/new) instead.

### Weapons

[Browse the current list of weapons](https://github.com/alexcroox/battlebit-stats/blob/main/src/lib/weapon-config.ts)

For each weapon we need a static image and an .obj file in order to animate a 3D model. I had trouble finding 3D models for many weapons in the source so just a .png is also fine.

### Vehicles

[Browse the current list of vehicles](https://github.com/alexcroox/battlebit-stats/blob/main/src/lib/vehicle-config.ts)

The main use for vehicles was in the future stats pages, there is no dedicated page like weapons. This can change if we find 3D models for each vehicle to display in an interesting way similar to weapons.
