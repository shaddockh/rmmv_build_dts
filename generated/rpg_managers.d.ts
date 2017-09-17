// Unknown object could be in namespace: DataManager at line: 464 in file: ./v1.5.1/rpg_managers.js
// function ConfigManager() {
// Unknown object could be in namespace: ImageManager at line: 1100 in file: ./v1.5.1/rpg_managers.js
// function AudioManager() {
// Unknown object could be in namespace: TextManager at line: 1667 in file: ./v1.5.1/rpg_managers.js
//         get: function() {
// rpg_managers.js v1.5.1
//=============================================================================
//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.
declare class DataManager {
	static loadDatabase();
	static loadDataFile(name, src);
	static isDatabaseLoaded();
	static loadMapData(mapId);
	static makeEmptyMap();
	static isMapLoaded();
	static onLoad(object);
	static extractMetadata(data);
	static checkError();
	static isBattleTest();
	static isEventTest();
	static isSkill(item);
	static isItem(item);
	static isWeapon(item);
	static isArmor(item);
	static createGameObjects();
	static setupNewGame();
	static setupBattleTest();
	static setupEventTest();
	static loadGlobalInfo();
	static saveGlobalInfo(info);
	static isThisGameFile(savefileId);
	static isAnySavefileExists();
	static latestSavefileId();
	static loadAllSavefileImages();
	static loadSavefileImages(info);
	static maxSavefiles();
	static saveGame(savefileId);
	static loadGame(savefileId);
	static loadSavefileInfo(savefileId);
	static lastAccessedSavefileId();
	static saveGameWithoutRescue(savefileId);
	static loadGameWithoutRescue(savefileId);
	static selectSavefileForNewGame();
	static makeSavefileInfo();
	static makeSaveContents();
	static extractSaveContents(contents);
}

declare class xhr {
	static onload();
}

declare class ConfigManager {
	static bgmVolume;
	static bgsVolume;
	static meVolume;
	static seVolume;
	static load();
	static save();
	static makeData();
	static applyData(config);
	static readFlag(config, name);
	static readVolume(config, name);
}

//-----------------------------------------------------------------------------
// StorageManager
//
// The static class that manages storage for saving game data.
declare class StorageManager {
	static save(savefileId, json);
	static load(savefileId);
	static exists(savefileId);
	static remove(savefileId);
	static backup(savefileId);
	static backupExists(savefileId);
	static cleanBackup(savefileId);
	static restoreBackup(savefileId);
	static isLocalMode();
	static saveToLocalFile(savefileId, json);
	static loadFromLocalFile(savefileId);
	static loadFromLocalBackupFile(savefileId);
	static localFileBackupExists(savefileId);
	static localFileExists(savefileId);
	static removeLocalFile(savefileId);
	static saveToWebStorage(savefileId, json);
	static loadFromWebStorage(savefileId);
	static loadFromWebStorageBackup(savefileId);
	static webStorageBackupExists(savefileId);
	static webStorageExists(savefileId);
	static removeWebStorage(savefileId);
	static localFileDirectoryPath();
	static localFilePath(savefileId);
	static webStorageKey(savefileId);
}

//-----------------------------------------------------------------------------
// ImageManager
//
// The static class that loads images, creates bitmap objects and retains them.
declare class ImageManager {

//undefined
	static _generateCacheKey(path, hue?);

//undefined
	static loadAnimation(filename, hue?);

//undefined
	static loadBattleback1(filename, hue?);

//undefined
	static loadBattleback2(filename, hue?);

//undefined
	static loadEnemy(filename, hue?);

//undefined
	static loadCharacter(filename, hue?);

//undefined
	static loadFace(filename, hue?);

//undefined
	static loadParallax(filename, hue?);

//undefined
	static loadPicture(filename, hue?);

//undefined
	static loadSvActor(filename, hue?);

//undefined
	static loadSvEnemy(filename, hue?);

//undefined
	static loadSystem(filename, hue?);

//undefined
	static loadTileset(filename, hue?);

//undefined
	static loadTitle1(filename, hue?);

//undefined
	static loadTitle2(filename, hue?);

//undefined
	static loadBitmap(folder, filename, hue?, smooth?);
	static loadEmptyBitmap();

//undefined
	static loadNormalBitmap(path, hue?);
	static clear();
	static isReady();
	static isObjectCharacter(filename);
	static isBigCharacter(filename);
	static isZeroParallax(filename);

//undefined
	static reserveAnimation(filename, hue?, reservationId?);

//undefined
	static reserveBattleback1(filename, hue?, reservationId?);

//undefined
	static reserveBattleback2(filename, hue?, reservationId?);

//undefined
	static reserveEnemy(filename, hue?, reservationId?);

//undefined
	static reserveCharacter(filename, hue?, reservationId?);

//undefined
	static reserveFace(filename, hue?, reservationId?);

//undefined
	static reserveParallax(filename, hue?, reservationId?);

//undefined
	static reservePicture(filename, hue?, reservationId?);

//undefined
	static reserveSvActor(filename, hue?, reservationId?);

//undefined
	static reserveSvEnemy(filename, hue?, reservationId?);

//undefined
	static reserveSystem(filename, hue?, reservationId?);

//undefined
	static reserveTileset(filename, hue?, reservationId?);

//undefined
	static reserveTitle1(filename, hue?, reservationId?);

//undefined
	static reserveTitle2(filename, hue?, reservationId?);

//undefined
	static reserveBitmap(folder, filename, hue?, smooth?, reservationId?);

//undefined
	static reserveNormalBitmap(path, hue?, reservationId?);
	static releaseReservation(reservationId);
	static setDefaultReservationId(reservationId);

//undefined
	static requestAnimation(filename, hue?);

//undefined
	static requestBattleback1(filename, hue?);

//undefined
	static requestBattleback2(filename, hue?);

//undefined
	static requestEnemy(filename, hue?);

//undefined
	static requestCharacter(filename, hue?);

//undefined
	static requestFace(filename, hue?);

//undefined
	static requestParallax(filename, hue?);

//undefined
	static requestPicture(filename, hue?);

//undefined
	static requestSvActor(filename, hue?);

//undefined
	static requestSvEnemy(filename, hue?);

//undefined
	static requestSystem(filename, hue?);

//undefined
	static requestTileset(filename, hue?);

//undefined
	static requestTitle1(filename, hue?);

//undefined
	static requestTitle2(filename, hue?);

//undefined
	static requestBitmap(folder, filename, hue?, smooth?);

//undefined
	static requestNormalBitmap(path, hue?);
	static update();
	static clearRequest();
}

declare class AudioManager {
	static masterVolume;
	static bgmVolume;
	static bgsVolume;
	static meVolume;
	static seVolume;
	static playBgm(bgm, pos);
	static playEncryptedBgm(bgm, pos);
	static createDecryptBuffer(url, bgm, pos);
	static replayBgm(bgm);
	static isCurrentBgm(bgm);
	static updateBgmParameters(bgm);
	static updateCurrentBgm(bgm, pos);
	static stopBgm();
	static fadeOutBgm(duration);
	static fadeInBgm(duration);
	static playBgs(bgs, pos);
	static replayBgs(bgs);
	static isCurrentBgs(bgs);
	static updateBgsParameters(bgs);
	static updateCurrentBgs(bgs, pos);
	static stopBgs();
	static fadeOutBgs(duration);
	static fadeInBgs(duration);
	static playMe(me);
	static updateMeParameters(me);
	static fadeOutMe(duration);
	static stopMe();
	static playSe(se);
	static updateSeParameters(buffer, se);
	static stopSe();
	static playStaticSe(se);
	static loadStaticSe(se);
	static isStaticSe(se);
	static stopAll();
	static saveBgm();
	static saveBgs();
	static makeEmptyAudioObject();
	static createBuffer(folder, name);
	static updateBufferParameters(buffer, configVolume, audio);
	static audioFileExt();
	static shouldUseHtml5Audio();
	static checkErrors();
	static checkWebAudioError(webAudio);
}

//-----------------------------------------------------------------------------
// SoundManager
//
// The static class that plays sound effects defined in the database.
declare class SoundManager {
	static preloadImportantSounds();
	static loadSystemSound(n);
	static playSystemSound(n);
	static playCursor();
	static playOk();
	static playCancel();
	static playBuzzer();
	static playEquip();
	static playSave();
	static playLoad();
	static playBattleStart();
	static playEscape();
	static playEnemyAttack();
	static playEnemyDamage();
	static playEnemyCollapse();
	static playBossCollapse1();
	static playBossCollapse2();
	static playActorDamage();
	static playActorCollapse();
	static playRecovery();
	static playMiss();
	static playEvasion();
	static playMagicEvasion();
	static playReflection();
	static playShop();
	static playUseItem();
	static playUseSkill();
}

//-----------------------------------------------------------------------------
// TextManager
//
// The static class that handles terms and messages.
declare class TextManager {
	static basic(basicId);
	static param(paramId);
	static command(commandId);
	static message(messageId);
	static getter(method, param);
	static currencyUnit;
}

//-----------------------------------------------------------------------------
// SceneManager
//
// The static class that manages scene transitions.
declare class SceneManager {

/*
* Gets the current time in ms without on iOS Safari.
* @private
*/
	static _getTimeInMsWithoutMobileSafari();
	static run(sceneClass);
	static initialize();
	static initGraphics();
	static preferableRendererType();
	static shouldUseCanvasRenderer();
	static checkWebGL();
	static checkFileAccess();
	static initAudio();
	static initInput();
	static initNwjs();
	static checkPluginErrors();
	static setupErrorHandlers();
	static requestUpdate();
	static update();
	static terminate();
	static onError(e);
	static onKeyDown(event);
	static catchException(e);
	static tickStart();
	static tickEnd();
	static updateInputData();
	static updateMain();
	static updateManagers();
	static changeScene();
	static updateScene();
	static renderScene();
	static onSceneCreate();
	static onSceneStart();
	static onSceneLoading();
	static isSceneChanging();
	static isCurrentSceneBusy();
	static isCurrentSceneStarted();
	static isNextScene(sceneClass);
	static isPreviousScene(sceneClass);
	static goto(sceneClass);
	static push(sceneClass);
	static pop();
	static exit();
	static clearStack();
	static stop();
	static prepareNextScene();
	static snap();
	static snapForBackground();
	static backgroundBitmap();
	static resume();
}

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.
declare class BattleManager {
	static setup(troopId, canEscape, canLose);
	static initMembers();
	static isBattleTest();
	static setBattleTest(battleTest);
	static setEventCallback(callback);
	static setLogWindow(logWindow);
	static setStatusWindow(statusWindow);
	static setSpriteset(spriteset);
	static onEncounter();
	static ratePreemptive();
	static rateSurprise();
	static saveBgmAndBgs();
	static playBattleBgm();
	static playVictoryMe();
	static playDefeatMe();
	static replayBgmAndBgs();
	static makeEscapeRatio();
	static update();
	static updateEvent();
	static updateEventMain();
	static isBusy();
	static isInputting();
	static isInTurn();
	static isTurnEnd();
	static isAborting();
	static isBattleEnd();
	static canEscape();
	static canLose();
	static isEscaped();
	static actor();
	static clearActor();
	static changeActor(newActorIndex, lastActorActionState);
	static startBattle();
	static displayStartMessages();
	static startInput();
	static inputtingAction();
	static selectNextCommand();
	static selectPreviousCommand();
	static refreshStatus();
	static startTurn();
	static updateTurn();
	static processTurn();
	static endTurn();
	static isForcedTurn();
	static updateTurnEnd();
	static getNextSubject();
	static allBattleMembers();
	static makeActionOrders();
	static startAction();
	static updateAction();
	static endAction();
	static invokeAction(subject, target);
	static invokeNormalAction(subject, target);
	static invokeCounterAttack(subject, target);
	static invokeMagicReflection(subject, target);
	static applySubstitute(target);
	static checkSubstitute(target);
	static isActionForced();
	static forceAction(battler);
	static processForcedAction();
	static abort();
	static checkBattleEnd();
	static checkAbort();
	static checkAbort2();
	static processVictory();
	static processEscape();
	static processAbort();
	static processDefeat();
	static endBattle(result);
	static updateBattleEnd();
	static makeRewards();
	static displayVictoryMessage();
	static displayDefeatMessage();
	static displayEscapeSuccessMessage();
	static displayEscapeFailureMessage();
	static displayRewards();
	static displayExp();
	static displayGold();
	static displayDropItems();
	static gainRewards();
	static gainExp();
	static gainGold();
	static gainDropItems();
}

//-----------------------------------------------------------------------------
// PluginManager
//
// The static class that manages the plugins.
declare class PluginManager {
	static setup(plugins);
	static checkErrors();
	static parameters(name);
	static setParameters(name, parameters);
	static loadScript(name);
	static onError(e);
}

