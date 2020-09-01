declare namespace ServerMp {
  // -------------------------------------------------------------------------
  // Custom types
  // -------------------------------------------------------------------------
  type HashOrString = number | string;
  type RGB = [number, number, number];
  type RGBA = [number, number, number, number];
  type Array2d = [number, number];
  type Array3d = [number, number, number];
  type Array4d = [number, number, number, number];

  // -------------------------------------------------------------------------
  // Main MP type
  // -------------------------------------------------------------------------
  type Mp = {
    blips: BlipMpPool;
    checkpoints: CheckpointMpPool;
    colshapes: ColshapeMpPool;
    events: EventMpPool;
    labels: TextLabelMpPool;
    markers: MarkerMpPool;
    peds: PedMpPool;
    pickups: PickupMpPool;
    players: PlayerMpPool;
    objects: ObjectMpPool;
    vehicles: VehicleMpPool;
    config: ConfigMp;
    world: WorldMp;

    Event: {
      new (eventName: RageEnums.EventKey | string, callback: (...args: any[]) => void): EventMp;
    };
    Vector3: Vector3Mp;

    joaat(str: string): number;
    joaat(strs: string[]): number[];
  };

  // -------------------------------------------------------------------------
  // Entity MP types
  // -------------------------------------------------------------------------

  interface BlipMp extends EntityMp {
    color: number;
    name: string;
    drawDistance: number;
    rotation: number;
    scale: number;
    shortRange: boolean;
    sprite: number;

    routeFor(player: PlayerMp | undefined, color: number, scale: number): void;
    routeFor(players: PlayerMp[] | undefined, color: number, scale: number): void;
    unrouteFor(player: PlayerMp): void;
    unrouteFor(players: PlayerMp[]): void;
  }

  interface CheckpointMp extends EntityMp {
    color: number;
    destination: Vector3Mp;
    radius: number;
    visible: boolean;

    getColor(): number[];
    hideFor(player: PlayerMp): void;
    setColor(red: number, green: number, blue: number, alpha: number): void;
    showFor(player: PlayerMp): void;
  }

  interface ColshapeMp extends EntityMp {
    readonly shapeType: RageEnums.ColshapeType;

    isPointWithin(point: Vector3Mp): boolean;
  }

  interface EntityMp {
    alpha: number;
    data: any;
    dimension: number;
    model: number;
    position: Vector3Mp;
    readonly id: number;
    readonly type: RageEnums.EntityType;

    getVariable(name: string): any | undefined;
    destroy(): void;
    dist(position: Vector3Mp): number;
    distSquared(position: Vector3Mp): number;
    setVariable(name: string, value: any): void;
  }

  interface MarkerMp extends EntityMp {
    direction: Vector3Mp;
    scale: number;
    visible: boolean;

    getColor(): number[];
    hideFor(player: PlayerMp): void;
    setColor(red: number, green: number, blue: number, alpha: number): void;
    showFor(player: PlayerMp): void;
  }

  interface PedMp extends EntityMp {
    controller: PlayerMp;
  }

  interface ObjectMp extends EntityMp {
    rotation: Vector3Mp;
  }

  interface PickupMp extends EntityMp {
    pickupHash: number;
  }

  interface PlayerMp extends EntityMp {
    armour: number;
    eyeColor: number;
    heading: number;
    health: number;
    name: string;
    weapon: number;
    weaponAmmo: number;
    readonly action: string;
    readonly aimTarget: PlayerMp;
    readonly allWeapons: number[];
    readonly ip: string;
    readonly isAiming: boolean;
    readonly isClimbing: boolean;
    readonly isEnteringVehicle: boolean;
    readonly isInCover: boolean;
    readonly isInMelee: boolean;
    readonly isJumping: boolean;
    readonly isLeavingVehicle: boolean;
    readonly isOnLadder: boolean;
    readonly isReloading: boolean;
    readonly hairColor: number;
    readonly hairHighlightColor: number;
    readonly packetLoss: number;
    readonly ping: number;
    readonly rgscId: string;
    readonly seat: RageEnums.VehicleSeat;
    readonly serial: string;
    readonly socialClub: string;
    readonly streamedPlayers: PlayerMp[];
    readonly weapons: PlayerWeaponCollectionMp;
    readonly vehicle: VehicleMp;
    readonly voiceListeners: PlayerMp[];

    ban(reason: string): void;
    call(eventName: string, args?: any[]): void;
    callProc(procName: string, ...args: any[]): void;
    clearDecorations(): void;
    disableVoiceTo(targetPlayer: PlayerMp): void;
    enableVoiceTo(targetPlayer: PlayerMp): void;
    getClothes(
      component: RageEnums.ClothesComponent | number
    ): {
      drawable: number;
      texture: number;
      palette: number;
    };
    getDecoration(collection: number): number;
    getFaceFeature(index: number): number;
    getHeadBlend(): {
      shapes: number[];
      skins: number[];
      shapeMix: number;
      skinMix: number;
      thirdMix: number;
    };
    getHeadOverlay(overlay: RageEnums.HeadOverlay | number): Array4d;
    getProp(
      prop: RageEnums.PlayerProp | number
    ): {
      drawable: number;
      texture: number;
    };
    getWeaponAmmo(weapon: RageEnums.Hashes.Weapon | HashOrString): number;
    giveWeapon(weaponHash: RageEnums.Hashes.Weapon | HashOrString, ammo: number): void;
    giveWeapon(weaponHashes: (RageEnums.Hashes.Weapon | HashOrString)[], ammo: number): void;
    isStreamed(player: PlayerMp): boolean;
    invoke(hash: string, ...args: any[]): void;
    kick(reason: string): void;
    notify(message: string): void;
    outputChatBox(message: string): void;
    playAnimation(dict: string, name: string, speed: number, flag: number): void;
    stopAnimation(): void;
    putIntoVehicle(vehicle: VehicleMp, seat: RageEnums.VehicleSeat | number): void;
    removeAllWeapons(): void;
    removeDecoration(decoration: number, collection: number): void;
    removeFromVehicle(): void;
    removeObject(object: any): void; // TODO
    removeWeapon(weaponHash: RageEnums.Hashes.Weapon | HashOrString): void;
    setClothes(component: RageEnums.ClothesComponent | number, drawable: number, texture: number, palette: number): void;
    setCustomization(
      gender: boolean,
      shapeFirst: number,
      shapeSecond: number,
      shapeThird: number,
      skinFirst: number,
      skinSecond: number,
      skinThird: number,
      shapeMix: number,
      skinMix: number,
      thirdMix: number,
      eyeColor: number,
      hairColor: number,
      hightlightColor: number,
      faceFeatures: number[]
    ): void;
    setDecoration(collection: number, overlay: number): void;
    setFaceFeature(index: number, scale: number): void;
    setHairColor(firstColor: number, secondColor: number): void;
    setHeadBlend(
      shapeFirst: number,
      shapeSecond: number,
      shapeThird: number,
      skinFirst: number,
      skinSecond: number,
      skinThird: number,
      shapeMix: number,
      skinMix: number,
      thirdMix: number
    ): void;
    setHeadOverlay(overlay: RageEnums.HeadOverlay | number, value: Array4d): void;
    setProp(prop: RageEnums.PlayerProp | number, drawable: number, texture: number): void;
    setWeaponAmmo(weapon: RageEnums.Hashes.Weapon | HashOrString, ammo: number): void;
    spawn(position: Vector3Mp): void;
    updateHeadBlend(shapeMix: number, skinMix: number, thirdMix: number): void;
    playScenario(scenario: string): void;
  }

  interface TextLabelMp extends EntityMp {
    color: RGB;
    drawDistance: number;
    los: boolean;
    text: string;
  }

  interface VehicleMp extends EntityMp {
    bodyHealth: number;
    brake: boolean;
    engine: boolean;
    engineHealth: number;
    dashboardColor: number;
    dead: boolean;
    highbeams: boolean;
    horn: boolean;
    livery: number;
    locked: boolean;
    movable: boolean;
    neonEnabled: boolean;
    numberPlate: string;
    numberPlateType: number;
    pearlescentColor: number;
    rocketBoost: boolean;
    rotation: Vector3Mp;
    siren: boolean;
    steerAngle: number;
    taxiLights: boolean;
    trimColor: number;
    velocity: Vector3Mp;
    wheelColor: number;
    wheelType: number;
    windowTint: number;
    readonly extras: boolean[];
    readonly heading: number;
    readonly mods: number[];
    readonly quaternion: QuaternionMp;
    readonly streamedPlayers: PlayerMp[];
    readonly trailer: VehicleMp;
    readonly traileredBy: VehicleMp;

    explode(): void;
    getColor(id: number): number; // id: 0 - primary, 1 - secondary
    getColorRGB(id: number): RGB; // id: 0 - primary, 1 - secondary
    getExtra(index: number): boolean;
    getMod(modType: number): number;
    getNeonColor(): number[];
    getOccupant(seat: number): PlayerMp;
    getOccupants(): PlayerMp[];
    getPaint(id: number): number; // id: 0 - primary, 1 - secondary
    isStreamed(player: PlayerMp): boolean;
    playScenario(scenario: string): void;
    repair(): void;
    setColor(primary: number, secondary: number): void;
    setColorRGB(red1: number, green1: number, blue1: number, red2: number, green2: number, blue2: number): void;
    setExtra(index: number, value: boolean): void;
    setMod(modType: number, modIndex: number): void;
    setNeonColor(red: number, green: number, blue: number): void;
    setPaint(primaryType: number, primaryColor: number, secondaryType: number, secondaryColor: number): void;
    setOccupant(seat: number, player: PlayerMp): void;
    spawn(position: Vector3Mp, heading: number): void;
  }

  // -------------------------------------------------------------------------
  // Simple MP types
  // -------------------------------------------------------------------------

  interface WorldMp {
    weather: RageEnums.Weather | string;
    time: {
      hour: number;
      minute: number;
      second: number;

      set(hour: number, minute: number, second: number): void;
    };
    trafficLights: {
      locked: boolean;
      state: number;
    };

    removeIpl(name: string): void;
    requestIpl(name: string): void;
    setWeatherTransition(weather: RageEnums.Weather | string, duration?: number): void;
  }

  interface EventMp {
    destroy(): void;
  }

  interface ConfigMp {
    [prop: string]: any;
    announce: boolean;
    bind: string;
    gamemode: string;
    encryption: boolean;
    maxplayers: number;
    name: string;
    'stream-distance': number;
    port: number;
    'disallow-multiple-connections-per-ip': boolean;
    'limit-time-of-connections-per-ip': number;
    url: string;
    language: string;
    'sync-rate': number;
    'resource-scan-thread-limit': number;
    'max-ping': number;
    'min-fps': number;
    'max-packet-loss': number;
    'allow-cef-debugging': boolean;
    'enable-nodejs': boolean;
    csharp: boolean;
    'enable-http-security': boolean;
    'voice-chat': boolean;
    'allow-voice-chat-input': number;
    'voice-chat-sample-rate': number;
    'fastdl-host': string;
  }

  // -------------------------------------------------------------------------
  // Pool MP types
  // -------------------------------------------------------------------------

  interface BlipMpPool extends EntityMpPool<BlipMp> {
    'new'(
      sprite: number,
      position: Vector3Mp,
      options?: {
        alpha?: number;
        color?: number;
        dimension?: number;
        drawDistance?: number;
        name?: string;
        rotation?: number;
        scale?: number;
        shortRange?: boolean;
      }
    ): BlipMp;
  }

  interface CheckpointMpPool extends EntityMpPool<CheckpointMp> {
    'new'(
      type: number,
      position: Vector3Mp,
      radius: number,
      options?: {
        color?: RGBA;
        dimension?: number;
        direction?: Vector3Mp;
        visible?: boolean;
      }
    ): CheckpointMp;
  }

  interface ColshapeMpPool extends EntityMpPool<ColshapeMp> {
    newCircle(x: number, y: number, range: number): ColshapeMp;
    newCuboid(x: number, y: number, z: number, width: number, depth: number, height: number): ColshapeMp;
    newRectangle(x: number, y: number, width: number, height: number): ColshapeMp;
    newSphere(x: number, y: number, z: number, range: number): ColshapeMp;
    newTube(x: number, y: number, z: number, range: number, height: number): ColshapeMp;
  }

  interface EntityMpPool<TEntity> {
    readonly length: number;
    readonly size: number;

    apply(fn: (...args: any[]) => void, ...args: any[]): void;
    at(index: number): TEntity;
    exists(entity: TEntity | number): boolean;
    forEach(fn: (entity: TEntity) => void): void;
    forEachFast(fn: (entity: TEntity) => void): void;
    forEachInRange(position: Vector3Mp, range: number, fn: (entity: TEntity) => void): void;
    forEachInRange(position: Vector3Mp, range: number, dimension: number, fn: (entity: TEntity) => void): void;
    forEachInDimension(dimension: number, fn: (entity: TEntity) => void): void;
    getClosest(position: Vector3Mp, limit: number): TEntity;
    toArray(): TEntity[];
  }

  interface EventMpPool {
    add(eventName: RageEnums.EventKey | string, callback: (...args: any[]) => void): void;
    add(events: { [name: string]: (...args: any[]) => void }): void;
    addCommand(commandName: string, callback: (player: PlayerMp, fullText: string, ...args: string[]) => void): void;
    addCommand(commands: { [commandName: string]: (player: PlayerMp, fullText: string, ...args: string[]) => void }): void;
    call(player: PlayerMp, eventName: string, ...data: any[]): void;
    callLocal(eventName: string, ...args: any[]): void;
    delayShutdown: boolean;
    delayInitialization: boolean;
    getAllOf(eventName: string): EventMp[];
    remove(eventName: string, handler?: (...args: any[]) => void): void;
    remove(eventNames: string[]): void;
    reset(): void;
    addProc(procName: string, callback: (player: ServerMp.PlayerMp, ...args: any[]) => Promise<any>): void;
  }

  interface MarkerMpPool extends EntityMpPool<MarkerMp> {
    'new'(
      type: number,
      position: Vector3Mp,
      scale: number,
      options?: {
        color?: RGBA;
        dimension?: number;
        direction?: Vector3Mp;
        rotation?: Vector3Mp;
        visible?: boolean;
      }
    ): MarkerMp;
  }

  interface PedMpPool extends EntityMpPool<PedMp> {
    'new'(
      model: number,
      position: Vector3Mp,
      options?: {
        dynamic: boolean;
        frozen: boolean;
        invincible: boolean;
      }
    ): PedMp;
  }

  interface ObjectMpPool extends EntityMpPool<ObjectMp> {
    'new'(
      model: HashOrString,
      position: Vector3Mp,
      options?: {
        alpha?: number;
        dimension?: number;
        rotation?: Vector3Mp;
      }
    ): ObjectMp;
  }

  interface PickupMpPool extends EntityMpPool<PickupMp> {
    'new'(...args: any[]): PickupMp; // TODO
  }

  interface PlayerMpPool extends EntityMpPool<PlayerMp> {
    broadcast(text: string): void;
    broadcastInRange(position: Vector3Mp, range: number, text: string): void;
    broadcastInRange(position: Vector3Mp, range: number, dimension: number, text: string): void;
    broadcastInDimension(dimension: number, text: string): void;
    call(eventName: string, ...args: any[]): void;
    call(players: PlayerMp[], eventName: string, ...args: any[]): void;
    callInDimension(dimension: number, eventName: string, ...args: any[]): void;
    callInRange(position: Vector3Mp, range: number, eventName: string, ...args: any[]): void;
  }

  interface TextLabelMpPool extends EntityMpPool<TextLabelMp> {
    'new'(
      text: string,
      position: Vector3Mp,
      options?: {
        color?: RGBA;
        dimension?: number;
        drawDistance?: number;
        font?: number;
        los?: boolean;
      }
    ): TextLabelMp;
  }

  interface VehicleMpPool extends EntityMpPool<VehicleMp> {
    'new'(
      model: RageEnums.Hashes.Vehicle | HashOrString,
      position: Vector3Mp,
      options?: {
        alpha?: number;
        color?: [Array2d, Array2d] | [RGB, RGB];
        dimension?: number;
        engine?: boolean;
        heading?: number;
        locked?: boolean;
        numberPlate?: string;
      }
    ): VehicleMp;
  }

  // -------------------------------------------------------------------------
  // Additional MP types
  // -------------------------------------------------------------------------

  type Vector3Mp = {
    new (x: number, y: number, z: number): Vector3Mp;

    x: number;
    y: number;
    z: number;

    add(value: number): Vector3Mp;
    add(vector3: Vector3Mp): Vector3Mp;
    angleTo(vector3: Vector3Mp): number;
    clone(): Vector3Mp;
    cross(vector3: Vector3Mp): Vector3Mp;
    divide(value: number): Vector3Mp;
    divide(vector3: Vector3Mp): Vector3Mp;
    dot(vector3: Vector3Mp): number;
    equals(vector3: Vector3Mp): boolean;
    length(): number;
    max(): number;
    min(): number;
    multiply(value: number): Vector3Mp;
    multiply(vector3: Vector3Mp): Vector3Mp;
    negative(): Vector3Mp;
    subtract(value: number): Vector3Mp;
    subtract(vector3: Vector3Mp): Vector3Mp;
    toAngles(): Array2d;
    toArray(): Array3d;
    unit(): Vector3Mp;
  };

  type PlayerWeaponCollectionMp = {
    current: number;

    reset(): void;
  };

  type QuaternionMp = {
    x: number;
    y: number;
    z: number;
    w: number;
  };

  // -------------------------------------------------------------------------
  // Default typings extends
  // -------------------------------------------------------------------------

  interface Function {
    cancel: boolean;
    handler: EventMp;
  }
}

declare namespace ServerMp.RageEnums {
  const enum EventKey {
    ENTITY_CREATED = 'entityCreated',
    ENTITY_DESTROYED = 'entityDestroyed',
    ENTITY_MODEL_CHANGE = 'entityModelChange',
    PLAYER_CHAT = 'playerChat',
    PLAYER_COMMAND = 'playerCommand',
    PLAYER_DAMAGE = 'playerDamage',
    PLAYER_DEATH = 'playerDeath',
    PLAYER_ENTER_CHECKPOINT = 'playerEnterCheckpoint',
    PLAYER_ENTER_COLSHAPE = 'playerEnterColshape',
    PLAYER_ENTER_VEHICLE = 'playerEnterVehicle',
    PLAYER_EXIT_CHECKPOINT = 'playerExitCheckpoint',
    PLAYER_EXIT_COLSHAPE = 'playerExitColshape',
    PLAYER_EXIT_VEHICLE = 'playerExitVehicle',
    PLAYER_JOIN = 'playerJoin',
    PLAYER_MARK_WAYPOINT = 'playerMarkWaypoint',
    PLAYER_QUIT = 'playerQuit',
    PLAYER_REACH_WAYPOINT = 'playerReachWaypoint',
    PLAYER_READY = 'playerReady',
    PLAYER_SPAWN = 'playerSpawn',
    PLAYER_START_ENTER_VEHICLE = 'playerStartEnterVehicle',
    PLAYER_START_EXIT_VEHICLE = 'playerStartExitVehicle',
    PLAYER_STREAM_IN = 'playerStreamIn',
    PLAYER_STREAM_OUT = 'playerStreamOut',
    PLAYER_WEAPON_CHANGE = 'playerWeaponChange',
    TRAILER_ATTACHED = 'trailerAttached',
    VEHICLE_DAMAGE = 'vehicleDamage',
    VEHICLE_HORN_TOGGLE = 'vehicleHornToggle',
    VEHICLE_SIREN_TOGGLE = 'vehicleSirenToggle',
    VEHICLE_STREAM_IN = 'vehicleStreamIn',
    VEHICLE_STREAM_OUT = 'vehicleStreamOut'
  }

  const enum ClothesComponent {
    HEAD = 0,
    BEARD = 1,
    HAIR = 2,
    TORSO = 3,
    LEGS = 4,
    HANDS = 5,
    FOOT = 6,
    NONE = 7,
    ACCESSORIES_1 = 8,
    ACCESSORIES_2 = 9,
    MASK = 10,
    DECALS = 11,
    AUXILIARY = 12
  }

  const enum ColshapeType {
    CIRCLE = 'circle',
    CUBOID = 'cuboid',
    POLYGON = 'polygon',
    RECTANGLE = 'rectangle',
    SPHERE = 'sphere',
    TUBE = 'tube'
  }

  const enum EntityType {
    BLIP = 'blip',
    CHECKPOINT = 'checkpoint',
    COLSHAPE = 'colshape',
    MARKER = 'marker',
    OBJECT = 'object',
    PICKUP = 'pickup',
    PLAYER = 'player',
    VEHICLE = 'vehicle'
  }

  const enum HeadOverlay {
    BLEMISHES = 0,
    FACIAL_HAIR = 1,
    EYEBROWS = 2,
    AGEING = 3,
    MAKEUP = 4,
    BLUSH = 5,
    COMPLEXION = 6,
    SUN_DAMAGE = 7,
    LIPSTICK = 8,
    FRECKLES = 9,
    CHEST_HAIR = 10,
    BODY_BLEMISHES = 11,
    ADD_BODY_BLEMISHES = 12
  }

  const enum Marker {
    UPSIDE_DOWN_CONE = 0,
    VERTICAL_CYLINDER = 1,
    THICK_CEVRON_UP = 2,
    THIN_CEVRON_UP = 3,
    CHECKERED_FLAG_RECT = 4,
    CHECKERED_FLAG_CIRCLE = 5,
    VERTICAL_CIRCLE = 6,
    PLANE_MODEL = 7,
    LOST_MC_DARK = 8,
    LOST_MC_LIGHT = 9,
    NUMBER_0 = 10,
    NUMBER_1 = 11,
    NUMBER_2 = 12,
    NUMBER_3 = 13,
    NUMBER_4 = 14,
    NUMBER_5 = 15,
    NUMBER_6 = 16,
    NUMBER_7 = 17,
    NUMBER_8 = 18,
    NUMBER_9 = 19,
    CHEVRON_UP_1 = 20,
    CHEVRON_UP_2 = 21,
    CHEVRON_UP_3 = 22,
    HORIZONTAL_CIRCLE_FLAT = 23,
    REPLAY_ICON = 24,
    HORIZONTAL_CIRCLE_SKINNY = 25,
    HORIZONTAL_CIRCLE_ARROW = 26,
    HORIZONTAL_SPLIT_ARROW_CIRCLE = 27,
    DEBUG_SPHERE = 28,
    DOLLOR_SIGN = 29,
    HORIZONTAL_BARS = 30,
    WOLF_HEAD = 31
  }

  const enum PlayerProp {
    HELMET = 0,
    GLASSES = 1,
    EAR_ACCESSORY = 2
  }

  const enum VehicleSeat {
    DRIVER = -1,
    PASSENGER_1 = 0,
    PASSENGER_2 = 1,
    PASSENGER_3 = 2
  }

  const enum Weather {
    BLIZZARD = 'BLIZZARD',
    CLEAR = 'CLEAR',
    CLEARING = 'CLEARING',
    CLOUDS = 'CLOUDS',
    EXTRA_SUNNY = 'EXTRASUNNY',
    FOGGY = 'FOGGY',
    OVERCAST = 'OVERCAST',
    RAIN = 'RAIN',
    SMOG = 'SMOG',
    SNOW_LIGHT = 'SNOWLIGHT',
    THUNDER = 'THUNDER',
    XMAS = 'XMAS'
  }
}

declare namespace ServerMp.RageEnums.Hashes {
  const enum Weapon {
    ADVANCEDRIFLE = 0xaf113f99,
    APPISTOL = 0x22d8fe39,
    ASSAULTRIFLE = 0xbfefff6d,
    ASSAULTRIFLE_MK2 = 0x394f415c,
    ASSAULTSHOTGUN = 0xe284c527,
    ASSAULTSMG = 0xefe7e2df,
    AUTOSHOTGUN = 0x12e82d3d,
    BALL = 0x23c9f95c,
    BAT = 0x958a4a8f,
    BATTLEAXE = 0xcd274149,
    BOTTLE = 0xf9e6aa4b,
    BULLPUPRIFLE = 0x7f229f94,
    BULLPUPRIFLE_MK2 = 0x84d6fafd,
    BULLPUPSHOTGUN = 0x9d61e50f,
    BZGAS = 0xa0973d5e,
    CARBINERIFLE = 0x83bf0278,
    CARBINERIFLE_MK2 = 0xfad1f1c9,
    COMBATMG = 0x7fd62962,
    COMBATMG_MK2 = 0xdbbd7280,
    COMBATPDW = 0x0a3d4d34,
    COMBATPISTOL = 0x5ef9fec4,
    COMPACTLAUNCHER = 0x0781fe4a,
    COMPACTRIFLE = 0x624fe830,
    CROWBAR = 0x84bd7bfd,
    DAGGER = 0x92a27487,
    DBSHOTGUN = 0xef951fbb,
    DOUBLEACTION = 0x97ea20b8,
    FIREEXTINGUISHER = 0x060ec506,
    FIREWORK = 0x7f7497e5,
    FLARE = 0x497facc3,
    FLAREGUN = 0x47757124,
    FLASHLIGHT = 0x8bb05fd7,
    GOLFCLUB = 0x440e4788,
    GRENADE = 0x93e220bd,
    GRENADELAUNCHER = 0xa284510b,
    GRENADELAUNCHER_SMOKE = 0x4dd2dc56,
    GUSENBERG = 0x61012683,
    HAMMER = 0x4e875f73,
    HATCHET = 0xf9dcbf2d,
    HEAVYPISTOL = 0xd205520e,
    HEAVYSHOTGUN = 0x3aabbbaa,
    HEAVYSNIPER = 0x0c472fe2,
    HEAVYSNIPER_MK2 = 0xa914799,
    HOMINGLAUNCHER = 0x63ab0442,
    KNIFE = 0x99b507ea,
    KNUCKLE = 0xd8df3c3c,
    MACHETE = 0xdd5df8d9,
    MACHINEPISTOL = 0xdb1aa450,
    MARKSMANPISTOL = 0xdc4db296,
    MARKSMANRIFLE = 0xc734385a,
    MARKSMANRIFLE_MK2 = 0x6a6c02e0,
    MG = 0x9d07f764,
    MICROSMG = 0x13532244,
    MINIGUN = 0x42bf8a85,
    MINISMG = 0xbd248b55,
    MOLOTOV = 0x24b17070,
    MUSKET = 0xa89cb99e,
    NIGHTSTICK = 0x678b81b1,
    PARACHUTE = 0xfbab5776,
    PETROLCAN = 0x34a67b97,
    PIPEBOMB = 0xba45e8b8,
    PISTOL = 0x1b06d571,
    PISTOL_MK2 = 0xbfe256d4,
    PISTOL50 = 0x99aeeb3b,
    POOLCUE = 0x94117305,
    PROXIMINE = 0xab564b93,
    PUMPSHOTGUN = 0x1d073a89,
    PUMPSHOTGUN_MK2 = 0x555af99a,
    RAILGUN = 0x6d544c99,
    RAYPISTOL = 0xaf3696a1,
    RAYCARABINE = 0x476bf155,
    RAYMINIGUN = 0xb62d1f67,
    REVOLVER = 0xc1b3c3d1,
    REVOLVER_MK2 = 0xcb96392f,
    RPG = 0xb1ca77b1,
    SAWNOFFSHOTGUN = 0x7846a318,
    SMG = 0x2be6766b,
    SMG_MK2 = 0x78a97cd0,
    SMOKEGRENADE = 0xfdbc8a50,
    SNIPERRIFLE = 0x05fc3c11,
    SNOWBALL = 0x787f0bb,
    SNSPISTOL = 0xbfd21232,
    SNSPISTOL_MK2 = 0x88374054,
    STONE_HATCHET = 0x3813fc08,
    SPECIALCARBINE = 0xc0a3098d,
    SPECIALCARBINE_MK2 = 0x969c3d67,
    STICKYBOMB = 0x2c3731d9,
    STUNGUN = 0x3656c8c1,
    SWITCHBLADE = 0xdfe37640,
    UNARMED = 0xa2719263,
    VINTAGEPISTOL = 0x83839c4,
    WRENCH = 0x19044ee0
  }

  const enum Ped {
    A_C_BOAR = 0xce5ff074,
    A_C_CAT_01 = 0x573201b8,
    A_C_CHICKENHAWK = 0xaab71f62,
    A_C_CHIMP = 0xa8683715,
    A_C_CHOP = 0x14ec17ea,
    A_C_CORMORANT = 0x56e29962,
    A_C_COW = 0xfcfa9e1e,
    A_C_COYOTE = 0x644ac75e,
    A_C_CROW = 0x18012a9f,
    A_C_DEER = 0xd86b5a95,
    A_C_DOLPHIN = 0x8bbab455,
    A_C_FISH = 0x2fd800b7,
    A_C_HEN = 0x6af51faf,
    A_C_HUMPBACK = 0x471be4b2,
    A_C_HUSKY = 0x4e8f95a2,
    A_C_KILLERWHALE = 0x8d8ac8b9,
    A_C_MTLION = 0x1250d7ba,
    A_C_PIG = 0xb11bab56,
    A_C_PIGEON = 0x06a20728,
    A_C_POODLE = 0x431d501c,
    A_C_PUG = 0x6d362854,
    A_C_RABBIT_01 = 0xdfb55c81,
    A_C_RAT = 0xc3b52966,
    A_C_RETRIEVER = 0x349f33e1,
    A_C_RHESUS = 0xc2d06f53,
    A_C_ROTTWEILER = 0x9563221d,
    A_C_SEAGULL = 0xd3939dfd,
    A_C_SHARKHAMMER = 0x3c831724,
    A_C_SHARKTIGER = 0x06c3f072,
    A_C_SHEPHERD = 0x431fc24c,
    A_C_STINGRAY = 0xa148614d,
    A_C_WESTY = 0xad7844bb,
    A_F_M_BEACH_01 = 0x303638a7,
    A_F_M_BEVHILLS_01 = 0xbe086efd,
    A_F_M_BEVHILLS_02 = 0xa039335f,
    A_F_M_BODYBUILD_01 = 0x3bd99114,
    A_F_M_BUSINESS_02 = 0x1fc37dbc,
    A_F_M_DOWNTOWN_01 = 0x654ad86e,
    A_F_M_EASTSA_01 = 0x9d3dcb7a,
    A_F_M_EASTSA_02 = 0x63c8d891,
    A_F_M_FATBLA_01 = 0xfab48bcb,
    A_F_M_FATCULT_01 = 0xb5cf80e4,
    A_F_M_FATWHITE_01 = 0x38bad33b,
    A_F_M_KTOWN_01 = 0x52c824de,
    A_F_M_KTOWN_02 = 0x41018151,
    A_F_M_PROLHOST_01 = 0x169bd1e1,
    A_F_M_SALTON_01 = 0xde0e0969,
    A_F_M_SKIDROW_01 = 0xb097523b,
    A_F_M_SOUCENT_01 = 0x745855a1,
    A_F_M_SOUCENT_02 = 0xf322d338,
    A_F_M_SOUCENTMC_01 = 0xcde955d2,
    A_F_M_TOURIST_01 = 0x505603b9,
    A_F_M_TRAMP_01 = 0x48f96f5b,
    A_F_M_TRAMPBEAC_01 = 0x8ca0c266,
    A_F_O_GENSTREET_01 = 0x61c81c85,
    A_F_O_INDIAN_01 = 0xbad7bb80,
    A_F_O_KTOWN_01 = 0x47cf5e96,
    A_F_O_SALTON_01 = 0xccff7d8a,
    A_F_O_SOUCENT_01 = 0x3dfa1830,
    A_F_O_SOUCENT_02 = 0xa56de716,
    A_F_Y_BEACH_01 = 0xc79f6928,
    A_F_Y_BEVHILLS_01 = 0x445ac854,
    A_F_Y_BEVHILLS_02 = 0x5c2cf7f8,
    A_F_Y_BEVHILLS_03 = 0x20c8012f,
    A_F_Y_BEVHILLS_04 = 0x36df2d5d,
    A_F_Y_BUSINESS_01 = 0x2799efd8,
    A_F_Y_BUSINESS_02 = 0x31430342,
    A_F_Y_BUSINESS_03 = 0xae86fdb4,
    A_F_Y_BUSINESS_04 = 0xb7c61032,
    A_F_Y_EASTSA_01 = 0xf5b0079d,
    A_F_Y_EASTSA_02 = 0x0438a4ae,
    A_F_Y_EASTSA_03 = 0x51c03fa4,
    A_F_Y_EPSILON_01 = 0x689c2a80,
    A_F_Y_FEMALEAGENT = 0x50610c43,
    A_F_Y_FITNESS_01 = 0x457c64fb,
    A_F_Y_FITNESS_02 = 0x13c4818c,
    A_F_Y_GENHOT_01 = 0x2f4aec3e,
    A_F_Y_GOLFER_01 = 0x7dd8fb58,
    A_F_Y_HIKER_01 = 0x30830813,
    A_F_Y_HIPPIE_01 = 0x1475b827,
    A_F_Y_HIPSTER_01 = 0x8247d331,
    A_F_Y_HIPSTER_02 = 0x97f5fe8d,
    A_F_Y_HIPSTER_03 = 0xa5ba9a16,
    A_F_Y_HIPSTER_04 = 0x199881dc,
    A_F_Y_INDIAN_01 = 0x092d9cc1,
    A_F_Y_JUGGALO_01 = 0xdb134533,
    A_F_Y_RUNNER_01 = 0xc7496729,
    A_F_Y_RURMETH_01 = 0x3f789426,
    A_F_Y_SCDRESSY_01 = 0xdb5ec400,
    A_F_Y_SKATER_01 = 0x695fe666,
    A_F_Y_SOUCENT_01 = 0x2c641d7a,
    A_F_Y_SOUCENT_02 = 0x5a8ef9cf,
    A_F_Y_SOUCENT_03 = 0x87b25415,
    A_F_Y_TENNIS_01 = 0x550c79c6,
    A_F_Y_TOPLESS_01 = 0x9cf26183,
    A_F_Y_TOURIST_01 = 0x563b8570,
    A_F_Y_TOURIST_02 = 0x9123fb40,
    A_F_Y_VINEWOOD_01 = 0x19f41f65,
    A_F_Y_VINEWOOD_02 = 0xdab6a0eb,
    A_F_Y_VINEWOOD_03 = 0x379ddab8,
    A_F_Y_VINEWOOD_04 = 0xfae46146,
    A_F_Y_YOGA_01 = 0xc41b062e,
    A_M_M_ACULT_01 = 0x5442c66b,
    A_M_M_AFRIAMER_01 = 0xd172497e,
    A_M_M_BEACH_01 = 0x403db4fd,
    A_M_M_BEACH_02 = 0x787fa588,
    A_M_M_BEVHILLS_01 = 0x54dbee1f,
    A_M_M_BEVHILLS_02 = 0x3fb5c3d3,
    A_M_M_BUSINESS_01 = 0x7e6a64b7,
    A_M_M_EASTSA_01 = 0xf9a6f53f,
    A_M_M_EASTSA_02 = 0x07dd91ac,
    A_M_M_FARMER_01 = 0x94562dd7,
    A_M_M_FATLATIN_01 = 0x61d201b3,
    A_M_M_GENFAT_01 = 0x06dd569f,
    A_M_M_GENFAT_02 = 0x13aef042,
    A_M_M_GOLFER_01 = 0xa9eb0e42,
    A_M_M_HASJEW_01 = 0x6bd9b68c,
    A_M_M_HILLBILLY_01 = 0x6c9b2849,
    A_M_M_HILLBILLY_02 = 0x7b0e452f,
    A_M_M_INDIAN_01 = 0xddcaaa2c,
    A_M_M_KTOWN_01 = 0xd15d7e71,
    A_M_M_MALIBU_01 = 0x2fde6eb7,
    A_M_M_MEXCNTRY_01 = 0xdd817ead,
    A_M_M_MEXLABOR_01 = 0xb25d16b2,
    A_M_M_OG_BOSS_01 = 0x681bd012,
    A_M_M_PAPARAZZI_01 = 0xecca8c15,
    A_M_M_POLYNESIAN_01 = 0xa9d9b69e,
    A_M_M_PROLHOST_01 = 0x9712c38f,
    A_M_M_RURMETH_01 = 0x3bad4184,
    A_M_M_SALTON_01 = 0x4f2e038a,
    A_M_M_SALTON_02 = 0x60f4a717,
    A_M_M_SALTON_03 = 0xb28c4a45,
    A_M_M_SALTON_04 = 0x964511b7,
    A_M_M_SKATER_01 = 0xd9d7588c,
    A_M_M_SKIDROW_01 = 0x01eea6bd,
    A_M_M_SOCENLAT_01 = 0x0b8d69e3,
    A_M_M_SOUCENT_01 = 0x6857c9b7,
    A_M_M_SOUCENT_02 = 0x9f6d37e1,
    A_M_M_SOUCENT_03 = 0x8bd990ba,
    A_M_M_SOUCENT_04 = 0xc2fbfefe,
    A_M_M_STLAT_02 = 0xc2a87702,
    A_M_M_TENNIS_01 = 0x546a5344,
    A_M_M_TOURIST_01 = 0xc89f0184,
    A_M_M_TRAMP_01 = 0x1ec93fd0,
    A_M_M_TRAMPBEAC_01 = 0x53b57eb0,
    A_M_M_TRANVEST_01 = 0xe0e69974,
    A_M_M_TRANVEST_02 = 0xf70ec5c4,
    A_M_O_ACULT_01 = 0x55446010,
    A_M_O_ACULT_02 = 0x4ba14cca,
    A_M_O_BEACH_01 = 0x8427d398,
    A_M_O_GENSTREET_01 = 0xad54e7a8,
    A_M_O_KTOWN_01 = 0x1536d95a,
    A_M_O_SALTON_01 = 0x20208e4d,
    A_M_O_SOUCENT_01 = 0x2ad8921b,
    A_M_O_SOUCENT_02 = 0x4086bd77,
    A_M_O_SOUCENT_03 = 0x0e32d8d0,
    A_M_O_TRAMP_01 = 0x174d4245,
    A_M_Y_ACULT_01 = 0xb564882b,
    A_M_Y_ACULT_02 = 0x80e59f2e,
    A_M_Y_BEACH_01 = 0xd1feb884,
    A_M_Y_BEACH_02 = 0x23c7dc11,
    A_M_Y_BEACH_03 = 0xe7a963d9,
    A_M_Y_BEACHVESP_01 = 0x7e0961b8,
    A_M_Y_BEACHVESP_02 = 0xca56fa52,
    A_M_Y_BEVHILLS_01 = 0x76284640,
    A_M_Y_BEVHILLS_02 = 0x668ba707,
    A_M_Y_BREAKDANCE_01 = 0x379f9596,
    A_M_Y_BUSICAS_01 = 0x9ad32fe9,
    A_M_Y_BUSINESS_01 = 0xc99f21c4,
    A_M_Y_BUSINESS_02 = 0xb3b3f5e6,
    A_M_Y_BUSINESS_03 = 0xa1435105,
    A_M_Y_CYCLIST_01 = 0xfdc653c7,
    A_M_Y_DHILL_01 = 0xff3e88ab,
    A_M_Y_DOWNTOWN_01 = 0x2dadf4aa,
    A_M_Y_EASTSA_01 = 0xa4471173,
    A_M_Y_EASTSA_02 = 0x168775f6,
    A_M_Y_EPSILON_01 = 0x77d41a3e,
    A_M_Y_EPSILON_02 = 0xaa82ff9b,
    A_M_Y_GAY_01 = 0xd1cce036,
    A_M_Y_GAY_02 = 0xa5720781,
    A_M_Y_GENSTREET_01 = 0x9877ef71,
    A_M_Y_GENSTREET_02 = 0x3521a8d2,
    A_M_Y_GOLFER_01 = 0xd71fe131,
    A_M_Y_HASJEW_01 = 0xe16d8f01,
    A_M_Y_HIKER_01 = 0x50f73c0c,
    A_M_Y_HIPPY_01 = 0x7d03e617,
    A_M_Y_HIPSTER_01 = 0x2307a353,
    A_M_Y_HIPSTER_02 = 0x14d506ee,
    A_M_Y_HIPSTER_03 = 0x4e4179c6,
    A_M_Y_INDIAN_01 = 0x2a22fbce,
    A_M_Y_JETSKI_01 = 0x2db7eef3,
    A_M_Y_JUGGALO_01 = 0x91ca3e2c,
    A_M_Y_KTOWN_01 = 0x1af6542c,
    A_M_Y_KTOWN_02 = 0x297ff13f,
    A_M_Y_LATINO_01 = 0x132c1a8e,
    A_M_Y_METHHEAD_01 = 0x696be0a9,
    A_M_Y_MEXTHUG_01 = 0x3053e555,
    A_M_Y_MOTOX_01 = 0x64fdea7d,
    A_M_Y_MOTOX_02 = 0x77ac8fda,
    A_M_Y_MUSCLBEAC_01 = 0x4b652906,
    A_M_Y_MUSCLBEAC_02 = 0xc923247c,
    A_M_Y_POLYNESIAN_01 = 0x8384fc9f,
    A_M_Y_ROADCYC_01 = 0xf561a4c6,
    A_M_Y_RUNNER_01 = 0x25305eee,
    A_M_Y_RUNNER_02 = 0x843d9d0f,
    A_M_Y_SALTON_01 = 0xd7606c30,
    A_M_Y_SKATER_01 = 0xc1c46677,
    A_M_Y_SKATER_02 = 0xaffac2e4,
    A_M_Y_SOUCENT_01 = 0xe716bdcb,
    A_M_Y_SOUCENT_02 = 0xaca3c8ca,
    A_M_Y_SOUCENT_03 = 0xc3f0f764,
    A_M_Y_SOUCENT_04 = 0x8a3703f1,
    A_M_Y_STBLA_01 = 0xcf92ade9,
    A_M_Y_STBLA_02 = 0x98c7404f,
    A_M_Y_STLAT_01 = 0x8674d5fc,
    A_M_Y_STWHI_01 = 0x2418c430,
    A_M_Y_STWHI_02 = 0x36c6e98c,
    A_M_Y_SUNBATHE_01 = 0xb7292f0c,
    A_M_Y_SURFER_01 = 0xeac2c7ee,
    A_M_Y_VINDOUCHE_01 = 0xc19377e7,
    A_M_Y_VINEWOOD_01 = 0x4b64199d,
    A_M_Y_VINEWOOD_02 = 0x5d15bd00,
    A_M_Y_VINEWOOD_03 = 0x1fdf4294,
    A_M_Y_VINEWOOD_04 = 0x31c9e669,
    A_M_Y_YOGA_01 = 0xab0a7155,
    CS_AMANDATOWNLEY = 0x95ef18e3,
    CS_ANDREAS = 0xe7565327,
    CS_ASHLEY = 0x26c3d079,
    CS_BANKMAN = 0x9760192e,
    CS_BARRY = 0x69591cf7,
    CS_BEVERLY = 0xb46ec356,
    CS_BRAD = 0xefe5afe6,
    CS_BRADCADAVER = 0x7228af60,
    CS_CARBUYER = 0x8cce790f,
    CS_CASEY = 0xea969c40,
    CS_CHENGSR = 0x30db9d7b,
    CS_CHRISFORMAGE = 0xc1f380e6,
    CS_CLAY = 0xdbcb9834,
    CS_DALE = 0x0ce81655,
    CS_DAVENORTON = 0x8587248c,
    CS_DEBRA = 0xecd04fe9,
    CS_DENISE = 0x6f802738,
    CS_DEVIN = 0x2f016d02,
    CS_DOM = 0x4772af42,
    CS_DREYFUSS = 0x3c60a153,
    CS_DRFRIEDLANDER = 0xa3a35c2f,
    CS_FABIEN = 0x47035ec1,
    CS_FBISUIT_01 = 0x585c0b52,
    CS_FLOYD = 0x062547e7,
    CS_GUADALOPE = 0x0f9513f1,
    CS_GURK = 0xc314f727,
    CS_HUNTER = 0x5b44892c,
    CS_JANET = 0x3034f9e2,
    CS_JEWELASS = 0x4440a804,
    CS_JIMMYBOSTON = 0x039677bd,
    CS_JIMMYDISANTO = 0xb8cc92b4,
    CS_JOEMINUTEMAN = 0xf09d5e29,
    CS_JOHNNYKLEBITZ = 0xfa8ab881,
    CS_JOSEF = 0x459762ca,
    CS_JOSH = 0x450eef9d,
    CS_KAREN_DANIELS = 0x4baf381c,
    CS_LAMARDAVIS = 0x45463a0d,
    CS_LAZLOW = 0x38951a1b,
    CS_LESTERCREST = 0xb594f5c3,
    CS_LIFEINVAD_01 = 0x72551375,
    CS_MAGENTA = 0x5816c61a,
    CS_MANUEL = 0xfbb374ca,
    CS_MARNIE = 0x574de134,
    CS_MARTINMADRAZO = 0x43595670,
    CS_MARYANN = 0x0998c7ad,
    CS_MICHELLE = 0x70aeb9c8,
    CS_MILTON = 0xb76a330f,
    CS_MOLLY = 0x45918e44,
    CS_MOVPREMF_01 = 0x4bba84d9,
    CS_MOVPREMMALE = 0x8d67ee7d,
    CS_MRK = 0xc3cc9a75,
    CS_MRS_THORNHILL = 0x4f921e6e,
    CS_MRSPHILLIPS = 0xcbfda3cf,
    CS_NATALIA = 0x4efeb1f0,
    CS_NERVOUSRON = 0x7896da94,
    CS_NIGEL = 0xe1479c0b,
    CS_OLD_MAN1A = 0x1eec7bdc,
    CS_OLD_MAN2 = 0x98f9e770,
    CS_OMEGA = 0x8b70b405,
    CS_ORLEANS = 0xad340f5a,
    CS_PAPER = 0x6b38b8f8,
    CS_PATRICIA = 0xdf8b1301,
    CS_PRIEST = 0x4d6de57e,
    CS_PROLSEC_02 = 0x1e9314a2,
    CS_RUSSIANDRUNK = 0x46521a32,
    CS_SIEMONYETARIAN = 0xc0937202,
    CS_SOLOMON = 0xf6d1e04e,
    CS_STEVEHAINS = 0xa4e0a1fe,
    CS_STRETCH = 0x893d6805,
    CS_TANISHA = 0x42fe5370,
    CS_TAOCHENG = 0x8864083d,
    CS_TAOSTRANSLATOR = 0x53536529,
    CS_TENNISCOACH = 0x5c26040a,
    CS_TERRY = 0x3a5201c5,
    CS_TOM = 0x69e8abc3,
    CS_TOMEPSILON = 0x8c0fd4e2,
    CS_TRACYDISANTO = 0x0609b130,
    CS_WADE = 0xd266d9d6,
    CS_ZIMBOR = 0xeaacaaf0,
    CSB_ABIGAIL = 0x89768941,
    CSB_AGENT = 0xd770c9b4,
    CSB_ANITA = 0x0703f106,
    CSB_ANTON = 0xa5c787b6,
    CSB_BALLASOG = 0xabef0004,
    CSB_BRIDE = 0x82bf7ea1,
    CSB_BURGERDRUG = 0x8cdcc057,
    CSB_CAR3GUY1 = 0x04430687,
    CSB_CAR3GUY2 = 0x1383a508,
    CSB_CHEF = 0xa347ca8a,
    CSB_CHEF2 = 0xae5be23a,
    CSB_CHIN_GOON = 0xa8c22996,
    CSB_CLETUS = 0xcae9e5d5,
    CSB_COP = 0x9ab35f63,
    CSB_CUSTOMER = 0xa44f6f8b,
    CSB_DENISE_FRIEND = 0xb58d2529,
    CSB_FOS_REP = 0x1bcc157b,
    CSB_G = 0xa28e71d7,
    CSB_GROOM = 0x7aab19d2,
    CSB_GROVE_STR_DLR = 0xe8594e22,
    CSB_HAO = 0xec9e8f1c,
    CSB_HUGH = 0x6f139b54,
    CSB_IMRAN = 0xe3420bdb,
    CSB_JACKHOWITZER = 0x44bc7bb1,
    CSB_JANITOR = 0xc2005a40,
    CSB_MAUDE = 0xbcc475cb,
    CSB_MONEY = 0x989dfd9a,
    CSB_MP_AGENT14 = 0x6dbbfc8b,
    CSB_MWEATHER = 0x613e626c,
    CSB_ORTEGA = 0xc0db04cf,
    CSB_OSCAR = 0xf41f399b,
    CSB_PAIGE = 0x5b1fa0c3,
    CSB_POPOV = 0x617d89e2,
    CSB_PORNDUDES = 0x2f4afe35,
    CSB_PROLOGUEDRIVER = 0xf00b49db,
    CSB_PROLSEC = 0x7fa2f024,
    CSB_RAMP_GANG = 0xc2800dbe,
    CSB_RAMP_HIC = 0x858c94b8,
    CSB_RAMP_HIPSTER = 0x21f58bb4,
    CSB_RAMP_MARINE = 0x616c97b9,
    CSB_RAMP_MEX = 0xf64ed7d0,
    CSB_RASHCOSVKI = 0x188099a9,
    CSB_REPORTER = 0x2e420a24,
    CSB_ROCCOPELOSI = 0xaa64168c,
    CSB_SCREEN_WRITER = 0x8be12cec,
    CSB_STRIPPER_01 = 0xaeea76b5,
    CSB_STRIPPER_02 = 0x81441b71,
    CSB_TONYA = 0x6343dd19,
    CSB_TRAFFICWARDEN = 0xde2937f3,
    CSB_UNDERCOVER = 0xef785a6a,
    CSB_VAGSPEAK = 0x48ff4ca9,
    G_F_IMPORTEXPORT_01 = 0x84a1b11a,
    G_F_Y_BALLAS_01 = 0x158c439c,
    G_F_Y_FAMILIES_01 = 0x4e0ce5d3,
    G_F_Y_LOST_01 = 0xfd5537de,
    G_F_Y_VAGOS_01 = 0x5aa42c21,
    G_M_IMPORTEXPORT_01 = 0xbca2ccea,
    G_M_M_ARMBOSS_01 = 0xf1e823a2,
    G_M_M_ARMGOON_01 = 0xfda94268,
    G_M_M_ARMLIEUT_01 = 0xe7714013,
    G_M_M_CHEMWORK_01 = 0xf6157d8f,
    G_M_M_CHIBOSS_01 = 0xb9dd0300,
    G_M_M_CHICOLD_01 = 0x106d9a99,
    G_M_M_CHIGOON_01 = 0x7e4f763f,
    G_M_M_CHIGOON_02 = 0xff71f826,
    G_M_M_KORBOSS_01 = 0x352a026f,
    G_M_M_MEXBOSS_01 = 0x5761f4ad,
    G_M_M_MEXBOSS_02 = 0x4914d813,
    G_M_Y_ARMGOON_02 = 0xc54e878a,
    G_M_Y_AZTECA_01 = 0x68709618,
    G_M_Y_BALLAEAST_01 = 0xf42ee883,
    G_M_Y_BALLAORIG_01 = 0x231af63f,
    G_M_Y_BALLASOUT_01 = 0x23b88069,
    G_M_Y_FAMCA_01 = 0xe83b93b7,
    G_M_Y_FAMDNF_01 = 0xdb729238,
    G_M_Y_FAMFOR_01 = 0x84302b09,
    G_M_Y_KOREAN_01 = 0x247502a9,
    G_M_Y_KOREAN_02 = 0x8fedd989,
    G_M_Y_KORLIEUT_01 = 0x7ccbe17a,
    G_M_Y_LOST_01 = 0x4f46d607,
    G_M_Y_LOST_02 = 0x3d843282,
    G_M_Y_LOST_03 = 0x32b11cdc,
    G_M_Y_MEXGANG_01 = 0xbddd5546,
    G_M_Y_MEXGOON_01 = 0x26ef3426,
    G_M_Y_MEXGOON_02 = 0x31a3498e,
    G_M_Y_MEXGOON_03 = 0x964d12dc,
    G_M_Y_POLOGOON_01 = 0x4f3fba06,
    G_M_Y_POLOGOON_02 = 0xa2e86156,
    G_M_Y_SALVABOSS_01 = 0x905ce0ca,
    G_M_Y_SALVAGOON_01 = 0x278c8cb7,
    G_M_Y_SALVAGOON_02 = 0x3273a285,
    G_M_Y_SALVAGOON_03 = 0x03b8c510,
    G_M_Y_STRPUNK_01 = 0xfd1c49bb,
    G_M_Y_STRPUNK_02 = 0x0da1eac6,
    HC_DRIVER = 0x3b474adf,
    HC_GUNMAN = 0x0b881aee,
    HC_HACKER = 0x99bb00f8,
    IG_ABIGAIL = 0x400aec41,
    IG_AGENT = 0x246af208,
    IG_AMANDATOWNLEY = 0x6d1e15f7,
    IG_ANDREAS = 0x47e4eea0,
    IG_ASHLEY = 0x7ef440db,
    IG_AVON = 0xfce270c2,
    IG_BALLASOG = 0xa70b4a92,
    IG_BANKMAN = 0x909d9e7f,
    IG_BARRY = 0x2f8845a3,
    IG_BENNY = 0xc4b715d2,
    IG_BESTMEN = 0x5746cd96,
    IG_BEVERLY = 0xbda21e5c,
    IG_BRAD = 0xbdbb4922,
    IG_BRIDE = 0x6162ec47,
    IG_CAR3GUY1 = 0x84f9e937,
    IG_CAR3GUY2 = 0x75c34aca,
    IG_CASEY = 0xe0fa2554,
    IG_CHEF = 0x49eadbf6,
    IG_CHEF2 = 0x85889ac3,
    IG_CHENGSR = 0xaae4ea7b,
    IG_CHRISFORMAGE = 0x286e54a7,
    IG_CLAY = 0x6ccfe08a,
    IG_CLAYPAIN = 0x9d0087a8,
    IG_CLETUS = 0xe6631195,
    IG_DALE = 0x467415e9,
    IG_DAVENORTON = 0x15cd4c33,
    IG_DENISE = 0x820b33bd,
    IG_DEVIN = 0x7461a0b0,
    IG_DOM = 0x9c2db088,
    IG_DREYFUSS = 0xda890932,
    IG_DRFRIEDLANDER = 0xcbfc0df5,
    IG_FABIEN = 0xd090c350,
    IG_FBISUIT_01 = 0x3ae4a33b,
    IG_FLOYD = 0xb1b196b2,
    IG_G = 0x841ba933,
    IG_GROOM = 0xfece8b85,
    IG_HAO = 0x65978363,
    IG_HUNTER = 0xce1324de,
    IG_JANET = 0x0d6d9c49,
    IG_JAY_NORRIS = 0x7a32ee74,
    IG_JEWELASS = 0x0f5d26bb,
    IG_JIMMYBOSTON = 0xeda0082d,
    IG_JIMMYDISANTO = 0x570462b9,
    IG_JOEMINUTEMAN = 0xbe204c9b,
    IG_JOHNNYKLEBITZ = 0x87ca80ae,
    IG_JOSEF = 0xe11a9fb4,
    IG_JOSH = 0x799e9eee,
    IG_KAREN_DANIELS = 0xeb51d959,
    IG_KERRYMCINTOSH = 0x5b3bd90d,
    IG_LAMARDAVIS = 0x65b93076,
    IG_LAZLOW = 0xdfe443e5,
    IG_LESTERCREST = 0x4da6e849,
    IG_LESTERCREST_2 = 0x6e42fd26,
    IG_LIFEINVAD_01 = 0x5389a93c,
    IG_LIFEINVAD_02 = 0x27bd51d4,
    IG_MAGENTA = 0xfcdc910a,
    IG_MALC = 0xf1bca919,
    IG_MANUEL = 0xfd418e10,
    IG_MARNIE = 0x188232d0,
    IG_MARYANN = 0xa36f9806,
    IG_MAUDE = 0x3be8287e,
    IG_MICHELLE = 0xbf9672f4,
    IG_MILTON = 0xcb3059b2,
    IG_MOLLY = 0xaf03dde1,
    IG_MONEY = 0x37facda6,
    IG_MP_AGENT14 = 0xfbf98469,
    IG_MRK = 0xeddcab6d,
    IG_MRS_THORNHILL = 0x1e04a96b,
    IG_MRSPHILLIPS = 0x3862eea8,
    IG_NATALIA = 0xde17dd3b,
    IG_NERVOUSRON = 0xbd006af1,
    IG_NIGEL = 0xc8b7167d,
    IG_OLD_MAN1A = 0x719d27f4,
    IG_OLD_MAN2 = 0xef154c47,
    IG_OMEGA = 0x60e6a7d8,
    IG_ONEIL = 0x2dc6d3e7,
    IG_ORLEANS = 0x61d4c771,
    IG_ORTEGA = 0x26a562b7,
    IG_PAIGE = 0x154fcf3f,
    IG_PAPER = 0x999b00c6,
    IG_PATRICIA = 0xc56e118c,
    IG_POPOV = 0x267630fe,
    IG_PRIEST = 0x6437e77d,
    IG_PROLSEC_02 = 0x27b3ad75,
    IG_RAMP_GANG = 0xe52e126c,
    IG_RAMP_HIC = 0x45753032,
    IG_RAMP_HIPSTER = 0xdeef9f6e,
    IG_RAMP_MEX = 0xe6ac74a4,
    IG_RASHCOSVKI = 0x380c4de6,
    IG_ROCCOPELOSI = 0xd5ba52ff,
    IG_RUSSIANDRUNK = 0x3d0a5eb1,
    IG_SCREEN_WRITER = 0xffe63677,
    IG_SIEMONYETARIAN = 0x4c7b2f05,
    IG_SOLOMON = 0x86bdfe26,
    IG_STEVEHAINS = 0x382121c8,
    IG_STRETCH = 0x36984358,
    IG_TALINA = 0xe793c8e8,
    IG_TANISHA = 0x0d810489,
    IG_TAOCHENG = 0xdc5c5ea5,
    IG_TAOSTRANSLATOR = 0x7c851464,
    IG_TENNISCOACH = 0xa23b5f57,
    IG_TERRY = 0x67000b94,
    IG_TOMEPSILON = 0xcd777aaa,
    IG_TONYA = 0xcac85344,
    IG_TRACYDISANTO = 0xde352a35,
    IG_TRAFFICWARDEN = 0x5719786d,
    IG_TYLERDIX = 0x5265f707,
    IG_VAGSPEAK = 0xf9fd068c,
    IG_WADE = 0x92991b72,
    IG_ZIMBOR = 0x0b34d6f5,
    MP_F_BOATSTAFF_01 = 0x3293b9ce,
    MP_F_CARDESIGN_01 = 0x242c34a7,
    MP_F_CHBAR_01 = 0xc3f6e385,
    MP_F_COCAINE_01 = 0x4b657af8,
    MP_F_COUNTERFEIT_01 = 0xb788f1f5,
    MP_F_DEADHOOKER = 0x73dea88b,
    MP_F_EXECPA_01 = 0x432ca064,
    MP_F_EXECPA_02 = 0x5972ccf0,
    MP_F_FORGERY_01 = 0x781a3cf8,
    MP_F_FREEMODE_01 = 0x9c9effd8,
    MP_F_HELISTAFF_01 = 0x19b6ff06,
    MP_F_METH_01 = 0xd2b27ec1,
    MP_F_MISTY_01 = 0xd128ff9d,
    MP_F_STRIPPERLITE = 0x2970a494,
    MP_F_WEED_01 = 0xb26573a3,
    MP_G_M_PROS_01 = 0x6c9dd7c9,
    MP_M_AVONGOON = 0x9c13cb95,
    MP_M_BOATSTAFF_01 = 0xc85f0a88,
    MP_M_BOGDANGOON = 0x4d5696f7,
    MP_M_CLAUDE_01 = 0xc0f371b7,
    MP_M_COCAINE_01 = 0x56d38f95,
    MP_M_COUNTERFEIT_01 = 0x9855c974,
    MP_M_EXARMY_01 = 0x45348dbb,
    MP_M_EXECPA_01 = 0x3e8417bc,
    MP_M_FAMDD_01 = 0x33a464e5,
    MP_M_FIBSEC_01 = 0x5cdef405,
    MP_M_FORGERY_01 = 0x613e709b,
    MP_M_FREEMODE_01 = 0x705e61f2,
    MP_M_G_VAGFUN_01 = 0xc4a617bd,
    MP_M_MARSTON_01 = 0x38430167,
    MP_M_METH_01 = 0xedb42f3f,
    MP_M_NIKO_01 = 0xeedacfc9,
    MP_M_SECUROGUARD_01 = 0xda2c984e,
    MP_M_SHOPKEEP_01 = 0x18ce57d0,
    MP_M_WAREMECH_01 = 0xf7a74139,
    MP_M_WEAPEXP_01 = 0x36ea5b09,
    MP_M_WEAPWORK_01 = 0x4186506e,
    MP_M_WEED_01 = 0x917ed459,
    MP_S_M_ARMOURED_01 = 0xcdef5408,
    PLAYER_ONE = 0x9b22dbaf,
    PLAYER_TWO = 0x9b810fa2,
    PLAYER_ZERO = 0x0d7114c9,
    S_F_M_FEMBARBER = 0x163b875b,
    S_F_M_MAID_01 = 0xe093c5c6,
    S_F_M_SHOP_HIGH = 0xae47e4b0,
    S_F_M_SWEATSHOP_01 = 0x312b5bc0,
    S_F_Y_AIRHOSTESS_01 = 0x5d71a46f,
    S_F_Y_BARTENDER_01 = 0x780c01bd,
    S_F_Y_BAYWATCH_01 = 0x4a8e5536,
    S_F_Y_COP_01 = 0x15f8700d,
    S_F_Y_FACTORY_01 = 0x69f46bf3,
    S_F_Y_HOOKER_01 = 0x028abf95,
    S_F_Y_HOOKER_02 = 0x14c3e407,
    S_F_Y_HOOKER_03 = 0x031640ac,
    S_F_Y_MIGRANT_01 = 0xd55b2bf5,
    S_F_Y_MOVPREM_01 = 0x2300c816,
    S_F_Y_RANGER_01 = 0x9fc7f637,
    S_F_Y_SCRUBS_01 = 0xab594ab6,
    S_F_Y_SHERIFF_01 = 0x4161d042,
    S_F_Y_SHOP_LOW = 0xa96e2604,
    S_F_Y_SHOP_MID = 0x3eecba5d,
    S_F_Y_STRIPPER_01 = 0x52580019,
    S_F_Y_STRIPPER_02 = 0x6e0fb794,
    S_F_Y_STRIPPERLITE = 0x5c14edfa,
    S_F_Y_SWEATSHOP_01 = 0x8502b6b2,
    S_M_M_AMMUCOUNTRY = 0x0de9a30a,
    S_M_M_ARMOURED_01 = 0x95c76ecd,
    S_M_M_ARMOURED_02 = 0x63858a4a,
    S_M_M_AUTOSHOP_01 = 0x040eabe3,
    S_M_M_AUTOSHOP_02 = 0xf06b849d,
    S_M_M_BOUNCER_01 = 0x9fd4292d,
    S_M_M_CCREW_01 = 0xc9e5f56b,
    S_M_M_CHEMSEC_01 = 0x2efeafd5,
    S_M_M_CIASEC_01 = 0x625d6958,
    S_M_M_CNTRYBAR_01 = 0x1a021b83,
    S_M_M_DOCKWORK_01 = 0x14d7b4e0,
    S_M_M_DOCTOR_01 = 0xd47303ac,
    S_M_M_FIBOFFICE_01 = 0xedbc7546,
    S_M_M_FIBOFFICE_02 = 0x26f067ad,
    S_M_M_FIBSEC_01 = 0x7b8b434b,
    S_M_M_GAFFER_01 = 0xa956bd9e,
    S_M_M_GARDENER_01 = 0x49ea5685,
    S_M_M_GENTRANSPORT = 0x1880ed06,
    S_M_M_HAIRDRESS_01 = 0x418dff92,
    S_M_M_HIGHSEC_01 = 0xf161d212,
    S_M_M_HIGHSEC_02 = 0x2930c1ab,
    S_M_M_JANITOR = 0xa96bd9ec,
    S_M_M_LATHANDY_01 = 0x9e80d2ce,
    S_M_M_LIFEINVAD_01 = 0xde0077fd,
    S_M_M_LINECOOK = 0xdb9c0997,
    S_M_M_LSMETRO_01 = 0x765aaae4,
    S_M_M_MARIACHI_01 = 0x7ea4ffa6,
    S_M_M_MARINE_01 = 0xf2daa2ed,
    S_M_M_MARINE_02 = 0xf0259d83,
    S_M_M_MIGRANT_01 = 0xed0ce4c6,
    S_M_M_MOVALIEN_01 = 0x64611296,
    S_M_M_MOVPREM_01 = 0xd85e6d28,
    S_M_M_MOVSPACE_01 = 0xe7b31432,
    S_M_M_PARAMEDIC_01 = 0xb353629e,
    S_M_M_PILOT_01 = 0xe75b4b1c,
    S_M_M_PILOT_02 = 0xf63de8e1,
    S_M_M_POSTAL_01 = 0x62599034,
    S_M_M_POSTAL_02 = 0x7367324f,
    S_M_M_PRISGUARD_01 = 0x56c96fc6,
    S_M_M_SCIENTIST_01 = 0x4117d39b,
    S_M_M_SECURITY_01 = 0xd768b228,
    S_M_M_SNOWCOP_01 = 0x1ae8bb58,
    S_M_M_STRPERF_01 = 0x795ac7a8,
    S_M_M_STRPREACH_01 = 0x1c0077fb,
    S_M_M_STRVEND_01 = 0xce9113a9,
    S_M_M_TRUCKER_01 = 0x59511a6c,
    S_M_M_UPS_01 = 0x9fc37f22,
    S_M_M_UPS_02 = 0xd0bde116,
    S_M_O_BUSKER_01 = 0xad9ef1bb,
    S_M_Y_AIRWORKER = 0x62018559,
    S_M_Y_AMMUCITY_01 = 0x9e08633d,
    S_M_Y_ARMYMECH_01 = 0x62cc28e2,
    S_M_Y_AUTOPSY_01 = 0xb2273d4e,
    S_M_Y_BARMAN_01 = 0xe5a11106,
    S_M_Y_BAYWATCH_01 = 0x0b4a6862,
    S_M_Y_BLACKOPS_01 = 0xb3f3ee34,
    S_M_Y_BLACKOPS_02 = 0x7a05fa59,
    S_M_Y_BLACKOPS_03 = 0x5076a73b,
    S_M_Y_BUSBOY_01 = 0xd8f9cd47,
    S_M_Y_CHEF_01 = 0x0f977ceb,
    S_M_Y_CLOWN_01 = 0x04498dde,
    S_M_Y_CONSTRUCT_01 = 0xd7da9e99,
    S_M_Y_CONSTRUCT_02 = 0xc5fefade,
    S_M_Y_COP_01 = 0x5e3da4a4,
    S_M_Y_DEALER_01 = 0xe497bbef,
    S_M_Y_DEVINSEC_01 = 0x9b557274,
    S_M_Y_DOCKWORK_01 = 0x867639d1,
    S_M_Y_DOORMAN_01 = 0x22911304,
    S_M_Y_DWSERVICE_01 = 0x75d30a91,
    S_M_Y_DWSERVICE_02 = 0xf5908a06,
    S_M_Y_FACTORY_01 = 0x4163a158,
    S_M_Y_FIREMAN_01 = 0xb6b1eda8,
    S_M_Y_GARBAGE = 0xee75a00f,
    S_M_Y_GRIP_01 = 0x309e7dea,
    S_M_Y_HWAYCOP_01 = 0x739b1ef5,
    S_M_Y_MARINE_01 = 0x65793043,
    S_M_Y_MARINE_02 = 0x58d696fe,
    S_M_Y_MARINE_03 = 0x72c0cad2,
    S_M_Y_MIME = 0x3cdca742,
    S_M_Y_PESTCONT_01 = 0x48114518,
    S_M_Y_PILOT_01 = 0xab300c07,
    S_M_Y_PRISMUSCL_01 = 0x5f2113a1,
    S_M_Y_PRISONER_01 = 0xb1bb9b59,
    S_M_Y_RANGER_01 = 0xef7135ae,
    S_M_Y_ROBBER_01 = 0xc05e1399,
    S_M_Y_SHERIFF_01 = 0xb144f9b9,
    S_M_Y_SHOP_MASK = 0x6e122c06,
    S_M_Y_STRVEND_01 = 0x927f2323,
    S_M_Y_SWAT_01 = 0x8d8f1b10,
    S_M_Y_USCG_01 = 0xca0050e9,
    S_M_Y_VALET_01 = 0x3b96f23e,
    S_M_Y_WAITER_01 = 0xad4c724c,
    S_M_Y_WINCLEAN_01 = 0x550d8d9d,
    S_M_Y_XMECH_01 = 0x441405ec,
    S_M_Y_XMECH_02 = 0xbe20fa04,
    S_M_Y_XMECH_02_MP = 0x69147a0d,
    U_F_M_CORPSE_01 = 0x2e140314,
    U_F_M_DROWNED_01 = 0xd7f37609,
    U_F_M_MIRANDA = 0x414fa27b,
    U_F_M_PROMOURN_01 = 0xa20899e7,
    U_F_O_MOVIESTAR = 0x35578634,
    U_F_O_PROLHOST_01 = 0xc512dd23,
    U_F_Y_BIKERCHIC = 0xfa389d4f,
    U_F_Y_COMJANE = 0xb6aa85ce,
    U_F_Y_CORPSE_01 = 0x9c70109d,
    U_F_Y_CORPSE_02 = 0x0d9c72f8,
    U_F_Y_HOTPOSH_01 = 0x969b6dfe,
    U_F_Y_JEWELASS_01 = 0xf0d4be2e,
    U_F_Y_MISTRESS = 0x5dca2528,
    U_F_Y_POPPYMICH = 0x23e9a09e,
    U_F_Y_PRINCESS = 0xd2e3a284,
    U_F_Y_SPYACTRESS = 0x5b81d86c,
    U_M_M_ALDINAPOLI = 0xf0ec56e2,
    U_M_M_BANKMAN = 0xc306d6f5,
    U_M_M_BIKEHIRE_01 = 0x76474545,
    U_M_M_DOA_01 = 0x621e6bfd,
    U_M_M_EDTOH = 0x2a797197,
    U_M_M_FIBARCHITECT = 0x342333d3,
    U_M_M_FILMDIRECTOR = 0x2b6e1bb6,
    U_M_M_GLENSTANK_01 = 0x45bb1666,
    U_M_M_GRIFF_01 = 0xc454bcbb,
    U_M_M_JESUS_01 = 0xce2cb751,
    U_M_M_JEWELSEC_01 = 0xacccbdb6,
    U_M_M_JEWELTHIEF = 0xe6cc3cdc,
    U_M_M_MARKFOST = 0x1c95cb0b,
    U_M_M_PARTYTARGET = 0x81f74de7,
    U_M_M_PROLSEC_01 = 0x709220c7,
    U_M_M_PROMOURN_01 = 0xce96030b,
    U_M_M_RIVALPAP = 0x60d5d6da,
    U_M_M_SPYACTOR = 0xac0ea5d8,
    U_M_M_STREETART_01 = 0x6c19e962,
    U_M_M_WILLYFIST = 0x90769a8f,
    U_M_O_FILMNOIR = 0x2bacc2db,
    U_M_O_FINGURU_01 = 0x46e39e63,
    U_M_O_TAPHILLBILLY = 0x9a1e5e52,
    U_M_O_TRAMP_01 = 0x6a8f1f9b,
    U_M_Y_ABNER = 0xf0ac2626,
    U_M_Y_ANTONB = 0xcf623a2c,
    U_M_Y_BABYD = 0xda116e7e,
    U_M_Y_BAYGOR = 0x5244247d,
    U_M_Y_BURGERDRUG_01 = 0x8b7d3766,
    U_M_Y_CHIP = 0x24604b2b,
    U_M_Y_CORPSE_01 = 0x94c2a03f,
    U_M_Y_CYCLIST_01 = 0x2d0efceb,
    U_M_Y_FIBMUGGER_01 = 0x85b9c668,
    U_M_Y_GUIDO_01 = 0xc6b49a2f,
    U_M_Y_GUNVEND_01 = 0xb3229752,
    U_M_Y_HIPPIE_01 = 0xf041880b,
    U_M_Y_IMPORAGE = 0x348065f5,
    U_M_Y_JUGGERNAUT_01 = 0x90ef5134,
    U_M_Y_JUSTIN = 0x7dc3908f,
    U_M_Y_MANI = 0xc8bb1e52,
    U_M_Y_MILITARYBUM = 0x4705974a,
    U_M_Y_PAPARAZZI = 0x5048b328,
    U_M_Y_PARTY_01 = 0x36e70600,
    U_M_Y_POGO_01 = 0xdc59940d,
    U_M_Y_PRISONER_01 = 0x7b9b4bc0,
    U_M_Y_PROLDRIVER_01 = 0x855e36a3,
    U_M_Y_RSRANGER_01 = 0x3c438cd2,
    U_M_Y_SBIKE = 0x6af4185d,
    U_M_Y_STAGGRM_01 = 0x9194ce03,
    U_M_Y_TATTOO_01 = 0x94ae2b8c,
    U_M_Y_ZOMBIE_01 = 0xac4b4506
  }

  const enum Vehicle {
    ADDER = 0xb779a091,
    AIRBUS = 0x4c80eb0e,
    AIRTUG = 0x5d0aac8f,
    AKUMA = 0x63abade7,
    ALPHA = 0x2db8d1aa,
    AMBULANCE = 0x45d56ada,
    ANNIHILATOR = 0x31f0b376,
    ARMYTANKER = 0xb8081009,
    ARMYTRAILER = 0xa7ff33f5,
    ARMYTRAILER2 = 0x9e6b14d6,
    ASEA = 0x94204d89,
    ASEA2 = 0x9441d8d5,
    ASTEROPE = 0x8e9254fb,
    AUTARCH = 0xed552c74,
    AVENGER = 0x81bd2ed0,
    AVENGER2 = 0x18606535,
    BAGGER = 0x806b9cc3,
    BALETRAILER = 0xe82ae656,
    BALLER = 0xcfca3668,
    BALLER2 = 0x08852855,
    BANSHEE = 0xc1e908d2,
    BARRACKS = 0xceea3f4b,
    BARRACKS2 = 0x4008eabb,
    BARRACKS3 = 0x2592b5cf,
    BARRAGE = 0xf34dfb25,
    BATI = 0xf9300cc5,
    BATI2 = 0xcadd5d2d,
    BENSON = 0x7a61b330,
    BESRA = 0x6cbd1d6d,
    BFINJECTION = 0x432aa566,
    BIFF = 0x32b91ae8,
    BIFTA = 0xeb298297,
    BISON = 0xfefd644f,
    BISON2 = 0x7b8297c5,
    BISON3 = 0x67b3f020,
    BJXL = 0x32b29a4b,
    BLADE = 0xb820ed5e,
    BLAZER = 0x8125bcf9,
    BLAZER2 = 0xfd231729,
    BLAZER3 = 0xb44f0582,
    BLIMP = 0xf7004c86,
    BLIMP2 = 0xdb6b4924,
    BLIMP3 = 0xeda4ed97,
    BLISTA = 0xeb70965f,
    BLISTA2 = 0x3dee5eda,
    BLISTA3 = 0xdcbc1c3b,
    BMX = 0x43779c54,
    BOATTRAILER = 0x1f3d44b5,
    BOBCATXL = 0x3fc5d440,
    BODHI2 = 0xaa699bb6,
    BOMBUSHKA = 0xfe0a508c,
    BOXVILLE = 0x898eccea,
    BOXVILLE2 = 0xf21b33be,
    BOXVILLE3 = 0x07405e08,
    BOXVILLE4 = 0x1a79847a,
    BRAWLER = 0xa7ce1bc5,
    BRICKADE = 0xedc6f847,
    BRUISER = 0x27d79225,
    BRUISER2 = 0x9b065c9e,
    BRUISER3 = 0x8644331a,
    BRUTUS = 0x7f81a829,
    BRUTUS2 = 0x8f49ae28,
    BRUTUS3 = 0x798682a2,
    BTYPE = 0x06ff6914,
    BUCCANEER = 0xd756460c,
    BUFFALO = 0xedd516c6,
    BUFFALO2 = 0x2bec3cbe,
    BUFFALO3 = 0x0e2c013e,
    BULLDOZER = 0x7074f39d,
    BULLET = 0x9ae6dda1,
    BURRITO = 0xafbb2ca4,
    BURRITO2 = 0xc9e8ff76,
    BURRITO3 = 0x98171bd3,
    BURRITO4 = 0x353b561d,
    BURRITO5 = 0x437cf2a0,
    BUS = 0xd577c962,
    BUZZARD = 0x2f03547b,
    BUZZARD2 = 0x2c75f0dd,
    CABLECAR = 0xc6c3242d,
    CADDY = 0x44623884,
    CADDY2 = 0xdff0594c,
    CAMPER = 0x6fd95f68,
    CARACARA = 0x4abebf23,
    CARACARA2 = 0xaf966f3c,
    CARBONIZZARE = 0x7b8ab45f,
    CARBONRS = 0x00abb0c0,
    CARGOBOB = 0xfcfcb68b,
    CARGOBOB2 = 0x60a7ea10,
    CARGOBOB3 = 0x53174eef,
    CARGOPLANE = 0x15f27762,
    CASCO = 0x3822bdfe,
    CAVALCADE = 0x779f23aa,
    CAVALCADE2 = 0xd0eb2be5,
    CERBERUS = 0xd039510b,
    CERBERUS2 = 0x287fa449,
    CERBERUS3 = 0x71d3b6f0,
    CHEBUREK = 0xc514aae0,
    CHEETAH = 0xb1d95da0,
    CHEETAH2 = 0x0d4e5f4d,
    CHERNOBOG = 0xd6bc7523,
    CHINO = 0x14d69010,
    CHINO2 = 0xaed64a63,
    CLIFFHANGER = 0x17420102,
    CLIQUE = 0xa29f78b0,
    COACH = 0x84718d34,
    COGCABRIO = 0x13b57d8a,
    COGNOSCENTI = 0x86fe0b60,
    COGNOSCENTI2 = 0xdbf2d57a,
    COMET2 = 0xc1ae4d16,
    COMET3 = 0x877358ad,
    COMET4 = 0x5d1903f9,
    COMET5 = 0x276d98a3,
    CONTENDER = 0x28b67aca,
    COQUETTE = 0x067bc037,
    COQUETTE2 = 0x3c4e2113,
    COQUETTE3 = 0x2ec385fe,
    CRUISER = 0x1aba13b5,
    CRUSADER = 0x132d5a1a,
    CUBAN800 = 0xd9927fe3,
    CUTTER = 0xc3fba120,
    DAEMON = 0x77934cee,
    DEATHBIKE = 0xfe5f0722,
    DEATHBIKE2 = 0x93f09558,
    DEATHBIKE3 = 0xae12c99c,
    DELUXO = 0x586765fb,
    DEVESTE = 0x5ee005da,
    DEVIANT = 0x4c3fff49,
    DILETTANTE = 0xbc993509,
    DILETTANTE2 = 0x64430650,
    DINGHY = 0x3d961290,
    DINGHY2 = 0x107f392c,
    DINGHY3 = 0x1e5e54ea,
    DINGHY4 = 0x33b47f96,
    DLOADER = 0x698521e3,
    DOCKTRAILER = 0x806efbee,
    DOCKTUG = 0xcb44b1ca,
    DODO = 0xca495705,
    DOMINATOR = 0x04ce68ac,
    DOMINATOR2 = 0xc96b73d9,
    DOMINATOR3 = 0xc52c6b93,
    DOMINATOR4 = 0xd6fb0f30,
    DOMINATOR5 = 0xae0a3d4f,
    DOMINATOR6 = 0xb2e046fb,
    DOUBLE = 0x9c669788,
    DRAFTER = 0x28eab80f,
    DUBSTA = 0x462fe277,
    DUBSTA2 = 0xe882e5f6,
    DUBSTA3 = 0xb6410173,
    DUKES = 0x2b26f456,
    DUKES2 = 0xec8f7094,
    DUMP = 0x810369e2,
    DUNE = 0x9cf21e0f,
    DUNE2 = 0x1fd824af,
    DUSTER = 0x39d6779e,
    DYNASTY = 0x127e90d5,
    ELEGY = 0x0bba2261,
    ELEGY2 = 0xde3d9d22,
    ELLIE = 0xb472d2b5,
    EMERUS = 0x4ee74355,
    EMPEROR = 0xd7278283,
    EMPEROR2 = 0x8fc3aadc,
    EMPEROR3 = 0xb5fcf74e,
    ENDURO = 0x6882fa73,
    ENTITY2 = 0x8198aedc,
    ENTITYXF = 0xb2fe5cf9,
    EXEMPLAR = 0xffb15b5e,
    F620 = 0xdcbcbe48,
    FAGALOA = 0x6068ad86,
    FAGGIO = 0x9229e4eb,
    FAGGIO2 = 0x0350d1ab,
    FAGGIO3 = 0xb328b188,
    FBI = 0x432ea949,
    FBI2 = 0x9dc66994,
    FELON = 0xe8a8bda8,
    FELON2 = 0xfaad85ee,
    FELTZER2 = 0x8911b9f5,
    FELTZER3 = 0xa29d6d10,
    FIRETRUCK = 0x73920f8e,
    FIRETRUK = 0x73920f8e,
    FIXTER = 0xce23d3bf,
    FLASHGT = 0xb4f32118,
    FLATBED = 0x50b0215a,
    FORKLIFT = 0x58e49664,
    FQ2 = 0xbc32a33b,
    FREECRAWLER = 0xfcc2f483,
    FREIGHT = 0x3d6aaa9b,
    FREIGHTCAR = 0x0afd22a6,
    FREIGHTCONT1 = 0x36dcff98,
    FREIGHTCONT2 = 0x0e512e79,
    FREIGHTGRAIN = 0x264d9262,
    FREIGHTTRAILER = 0xd1abb666,
    FROGGER = 0x2c634fbd,
    FROGGER2 = 0x742e9ac0,
    FUGITIVE = 0x71cb2ffb,
    FUROREGT = 0xbf1691e0,
    FUSILADE = 0x1dc0ba53,
    FUTO = 0x7836ce2f,
    GAUNTLET = 0x94b395c5,
    GAUNTLET2 = 0x14d22159,
    GAUNTLET3 = 0x2b0c4dcd,
    GAUNTLET4 = 0x734c5e50,
    GB200 = 0x71cbea98,
    GBURRITO = 0x97fa4f36,
    GBURRITO2 = 0x11aa0e14,
    GLENDALE = 0x047a6bc1,
    GRAINTRAILER = 0x3cc7f596,
    GRANGER = 0x9628879c,
    GRESLEY = 0xa3fc0f4d,
    GT500 = 0x8408f33a,
    GUARDIAN = 0x825a9f4c,
    HABANERO = 0x34b7390f,
    HAKUCHOU = 0x4b6c568a,
    HANDLER = 0x1a7fcefa,
    HAULER = 0x5a82f9ae,
    HAVOK = 0x89ba59f5,
    HELLION = 0xea6a047f,
    HERMES = 0x00e83c17,
    HEXER = 0x11f76c14,
    HOTKNIFE = 0x0239e390,
    HOTRING = 0x42836be5,
    HUNTLEY = 0x1d06d681,
    HUSTLER = 0x23ca25f2,
    HYDRA = 0x39d6e83f,
    IMPALER = 0x83070b62,
    IMPALER2 = 0x3c26bd0c,
    IMPALER3 = 0x8d45df49,
    IMPALER4 = 0x9804f4c7,
    IMPERATOR = 0x1a861243,
    IMPERATOR2 = 0x619c1b82,
    IMPERATOR3 = 0xd2f77e37,
    INFERNUS = 0x18f25ac7,
    INFERNUS2 = 0xac33179c,
    INGOT = 0xb3206692,
    INNOVATION = 0xf683eaca,
    INSURGENT = 0x9114eada,
    INSURGENT2 = 0x7b7e56f0,
    INTRUDER = 0x34dd8aa1,
    ISSI2 = 0xb9cb3b69,
    ISSI3 = 0x378236e1,
    ISSI4 = 0x256e92ba,
    ISSI5 = 0x5ba0ff1e,
    ISSI6 = 0x49e25ba1,
    ISSI7 = 0x6e8da4f7,
    ITALIGTO = 0xec3e3404,
    JACKAL = 0xdac67112,
    JB700 = 0x3eab5555,
    JESTER = 0xb2a716a3,
    JESTER2 = 0xbe0e6126,
    JESTER3 = 0xf330cb6a,
    JET = 0x3f119114,
    JETMAX = 0x33581161,
    JOURNEY = 0xf8d48e7a,
    JUGULAR = 0xf38c4245,
    KALAHARI = 0x05852838,
    KAMACHO = 0xf8c2e0e7,
    KHAMELION = 0x206d1b68,
    KHANJALI = 0xaa6f980a,
    KRIEGER = 0xd86a0247,
    KURUMA = 0xae2bfe94,
    KURUMA2 = 0x187d938d,
    LANDSTALKER = 0x4ba4e8dc,
    LAZER = 0xb39b0ae6,
    LECTRO = 0x26321e67,
    LGUARD = 0x1bf8d381,
    LOCUST = 0xc7e55211,
    LUXOR = 0x250b0c5e,
    LUXOR2 = 0xb79f589e,
    MAMMATUS = 0x97e55d11,
    MANANA = 0x81634188,
    MANCHEZ = 0xa5325278,
    MARQUIS = 0xc1ce1183,
    MARSHALL = 0x49863e9c,
    MASSACRO = 0xf77ade32,
    MASSACRO2 = 0xda5819a3,
    MAVERICK = 0x9d0450ca,
    MENACER = 0x79dd18ae,
    MESA = 0x36848602,
    MESA2 = 0xd36a4b44,
    MESA3 = 0x84f42e51,
    METROTRAIN = 0x33c9e158,
    MICHELLI = 0x3e5bd8d9,
    MILJET = 0x09d80f93,
    MINIVAN = 0xed7eada4,
    MIXER = 0xd138a6bb,
    MIXER2 = 0x1c534995,
    MONROE = 0xe62b361b,
    MONSTER = 0xcd93a7db,
    MONSTER3 = 0x669eb40a,
    MONSTER4 = 0x32174afc,
    MONSTER5 = 0xd556917c,
    MOWER = 0x6a4bd8f6,
    MULE = 0x35ed670b,
    MULE2 = 0xc1632beb,
    MULE3 = 0x85a5b471,
    MULE4 = 0x73f4110e,
    NEBULA = 0xcb642637,
    NEMESIS = 0xda288376,
    NEO = 0x9f6ed5a2,
    NEON = 0x91ca96ee,
    NINEF = 0x3d8fa25c,
    NINEF2 = 0xa8e38b01,
    NOVAK = 0x92f5024e,
    OPPRESSOR = 0x34b82784,
    OPPRESSOR2 = 0x7b54a9d3,
    ORACLE = 0x506434f6,
    ORACLE2 = 0xe18195b2,
    OSIRIS = 0x767164d6,
    PACKER = 0x21eee87d,
    PANTO = 0xe644e480,
    PARADISE = 0x58b3979c,
    PARAGON = 0xe550775b,
    PARAGON2 = 0x546d8eee,
    PARIAH = 0x33b98fe2,
    PATRIOT = 0xcfcfeb3b,
    PATRIOT2 = 0xe6e967f8,
    PBUS = 0x885f3671,
    PBUS2 = 0x149bd32a,
    PCJ = 0xc9ceaf06,
    PENUMBRA = 0xe9805550,
    PEYOTE = 0x6d19ccbc,
    PEYOTE2 = 0x9472cd24,
    PHANTOM = 0x809aa4cb,
    PHOENIX = 0x831a21d5,
    PICADOR = 0x59e0fbf3,
    PIGALLE = 0x404b6381,
    POLICE = 0x79fbb0c5,
    POLICE2 = 0x9f05f101,
    POLICE3 = 0x71fa16ea,
    POLICE4 = 0x8a63c7b9,
    POLICEB = 0xfdefaec3,
    POLICEOLD1 = 0xa46462f7,
    POLICEOLD2 = 0x95f4c618,
    POLICET = 0x1b38e955,
    POLMAV = 0x1517d4d9,
    PONY = 0xf8de29a8,
    PONY2 = 0x38408341,
    POUNDER = 0x7de35e7d,
    POUNDER2 = 0x6290f15b,
    PRAIRIE = 0xa988d3a2,
    PRANGER = 0x2c33b46e,
    PREDATOR = 0xe2e7d4ab,
    PREMIER = 0x8fb66f9b,
    PRIMO = 0xbb6b404f,
    PROPTRAILER = 0x153e1b0a,
    PROTOTIPO = 0x7e8f677f,
    RADI = 0x9d96b45b,
    RAIDEN = 0xa4d99b7d,
    RAKETRAILER = 0x174cb172,
    RANCHERXL = 0x6210cbb0,
    RANCHERXL2 = 0x7341576b,
    RAPIDGT = 0x8cb29a14,
    RAPIDGT2 = 0x679450af,
    RATBIKE = 0x6facdf31,
    RATLOADER = 0xd83c13ce,
    RATLOADER2 = 0xdce1d9f7,
    RCBANDITO = 0xeef345ec,
    REBEL = 0xb802dd46,
    REBEL2 = 0x8612b64b,
    REGINA = 0xff22d208,
    RENTALBUS = 0xbe819c63,
    REVOLTER = 0xe78cc3d9,
    RHAPSODY = 0x322cf98f,
    RHINO = 0x2ea68690,
    RIATA = 0xa4a4e453,
    RIOT = 0xb822a1aa,
    RIOT2 = 0x9b16a3b4,
    RIPLEY = 0xcd935ef9,
    ROCOTO = 0x7f5c91f1,
    ROMERO = 0x2560b2fc,
    RROCKET = 0x36a167e0,
    RUBBLE = 0x9a5b1dcc,
    RUFFIAN = 0xcabd11e8,
    RUINER = 0xf26ceff9,
    RUINER2 = 0x381e10bd,
    RUMPO = 0x4543b74d,
    RUMPO2 = 0x961afef7,
    RUMPO3 = 0x57f682af,
    S80 = 0xeca6b6a3,
    SABREGT = 0x9b909c94,
    SADLER = 0xdc434e51,
    SADLER2 = 0x2bc345d1,
    SANCHEZ = 0x2ef89e46,
    SANCHEZ2 = 0xa960b13e,
    SANDKING = 0xb9210fd0,
    SANDKING2 = 0x3af8c345,
    SAVAGE = 0xfb133a17,
    SAVESTRA = 0x35ded0dd,
    SC1 = 0x5097f589,
    SCARAB = 0xbba2a2f7,
    SCARAB2 = 0x5beb3ce0,
    SCARAB3 = 0xdd71bfeb,
    SCHAFTER2 = 0xb52b5113,
    SCHAFTER3 = 0xa774b5a6,
    SCHAFTER4 = 0x58cf185c,
    SCHAFTER5 = 0xcb0e7cd9,
    SCHAFTER6 = 0x72934be4,
    SCHLAGEN = 0xe1c03ab0,
    SCHWARZER = 0xd37b7976,
    SCORCHER = 0xf4e1aa15,
    SCRAMJET = 0xd9f0503d,
    SCRAP = 0x9a9fd3df,
    SEASHARK = 0xc2974024,
    SEASHARK2 = 0xdb4388e4,
    SEASPARROW = 0xd4ae63d9,
    SEMINOLE = 0x48ceced3,
    SENTINEL = 0x50732c82,
    SENTINEL2 = 0x3412ae2d,
    SENTINEL3 = 0x41d149aa,
    SERRANO = 0x4fb1a214,
    SHAMAL = 0xb79c1bf5,
    SHERIFF = 0x9baa707c,
    SHERIFF2 = 0x72935408,
    SHOTARO = 0xe7d2a16e,
    SKYLIFT = 0x3e48bf23,
    SLAMVAN = 0x2b7f9de3,
    SLAMVAN2 = 0x31adbbfc,
    SLAMVAN4 = 0x8526e2f5,
    SLAMVAN5 = 0x163f8520,
    SLAMVAN6 = 0x67d52852,
    SOVEREIGN = 0x2c509634,
    SPEEDER = 0x0dc60d2b,
    SPEEDO = 0xcfb3870c,
    SPEEDO2 = 0x2b6dc64a,
    SPEEDO4 = 0x0d17099d,
    SQUALO = 0x17df5ec2,
    STAFFORD = 0x1324e960,
    STALION = 0x72a4c31e,
    STALION2 = 0xe80f67ee,
    STANIER = 0xa7ede74d,
    STINGER = 0x5c23af9b,
    STINGERGT = 0x82e499fa,
    STOCKADE = 0x6827cf72,
    STOCKADE3 = 0xf337ab36,
    STRATUM = 0x66b4fc45,
    STREITER = 0x67d2b389,
    STRETCH = 0x8b13f083,
    STRIKEFORCE = 0x64de07a1,
    STROMBERG = 0x34dba661,
    STUNT = 0x81794c70,
    SUBMERSIBLE = 0x2dff622f,
    SUBMERSIBLE2 = 0xc07107ee,
    SULTAN = 0x39da2754,
    SULTANRS = 0xee6024bc,
    SUNTRAP = 0xef2295c9,
    SUPERD = 0x42f2ed16,
    SURANO = 0x16e478c1,
    SURFER = 0x29b0da97,
    SURFER2 = 0xb1d80e06,
    SURGE = 0x8f0e3594,
    SWIFT = 0xebc24df2,
    SWIFT2 = 0x4019cb4c,
    SWINGER = 0x1dd4c0ff,
    T20 = 0x6322b39a,
    TACO = 0x744ca80d,
    TAILGATER = 0xc3ddfdce,
    TAIPAN = 0xbc5dc07e,
    TAMPA = 0x39f9c898,
    TAMPA2 = 0xc0240885,
    TAMPA3 = 0xb7d9f7f1,
    TANKER = 0xd46f4737,
    TANKER2 = 0x74998082,
    TANKERCAR = 0x22eddc30,
    TAXI = 0xc703db5f,
    TECHNICAL = 0x83051506,
    TERBYTE = 0x897afc65,
    TEZERACT = 0x3d7c6410,
    THRAX = 0x3e3d1f59,
    THRUST = 0x6d6f8f43,
    THRUSTER = 0x58cdaf30,
    TIPTRUCK = 0x02e19879,
    TIPTRUCK2 = 0xc7824e5e,
    TITAN = 0x761e2ad3,
    TORNADO = 0x1bb290bc,
    TORNADO2 = 0x5b42a5c4,
    TORNADO3 = 0x690a4153,
    TORNADO4 = 0x86cf7cdd,
    TORO = 0x3fd5aa2f,
    TOROS = 0xba5334ac,
    TOURBUS = 0x73b1c3cb,
    TOWTRUCK = 0xb12314e0,
    TOWTRUCK2 = 0xe5a2d6c6,
    TR2 = 0x7be032c6,
    TR3 = 0x6a59902d,
    TR4 = 0x7cab34d0,
    TRACTOR = 0x61d6ba8c,
    TRACTOR2 = 0x843b73de,
    TRACTOR3 = 0x562a97bd,
    TRAILERLOGS = 0x782a236d,
    TRAILERS = 0xcbb2be0e,
    TRAILERS2 = 0xa1da3c91,
    TRAILERS3 = 0x8548036d,
    TRAILERSMALL = 0x2a72beab,
    TRASH = 0x72435a19,
    TRASH2 = 0xb527915c,
    TRFLAT = 0xaf62f6b2,
    TRIBIKE = 0x4339cd69,
    TRIBIKE2 = 0xb67597ec,
    TRIBIKE3 = 0xe823fb48,
    TROPIC = 0x1149422f,
    TULIP = 0x56d42971,
    TURISMOR = 0x185484e1,
    TVTRAILER = 0x967620be,
    TYRANT = 0xe99011c2,
    UTILLITRUCK = 0x1ed0a534,
    UTILLITRUCK2 = 0x34e6bf6b,
    UTILLITRUCK3 = 0x7f2153df,
    VACCA = 0x142e0dc3,
    VADER = 0xf79a00f7,
    VALKYRIE = 0xa09e15fd,
    VAMOS = 0xfd128dfd,
    VELUM = 0x9c429b6a,
    VELUM2 = 0x403820e8,
    VESTRA = 0x4ff77e37,
    VIGERO = 0xcec6b9b7,
    VINDICATOR = 0xaf599f01,
    VIRGO = 0xe2504942,
    VISERIS = 0xe8a8ba94,
    VOLATOL = 0x1aad0ded,
    VOLTIC = 0x9f4b77be,
    VOODOO2 = 0x1f3766e3,
    WARRENER = 0x51d83328,
    WASHINGTON = 0x69f06b57,
    WINDSOR = 0x5e4327c8,
    XLS = 0x47bbcf2e,
    XLS2 = 0xe6401328,
    YOSEMITE = 0x6f946279,
    YOUGA = 0x03e5f6b8,
    Z190 = 0x3201dd49,
    ZENTORNO = 0xac5df515,
    ZION = 0xbd1b39c3,
    ZION2 = 0xb8e2ae18,
    ZION3 = 0x6f039a67,
    ZORRUSSO = 0xd757d97d,
    ZR380 = 0x20314b42,
    ZR3802 = 0xbe11efc6,
    ZR3803 = 0xa7dcc35c,
    ZTYPE = 0x2d3bd401
  }
}

declare const mp: ServerMp.Mp | ClientMp.Mp;
