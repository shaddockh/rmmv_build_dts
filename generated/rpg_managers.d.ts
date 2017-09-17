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
	loadDatabase();
	loadDataFile(name, src);
	isDatabaseLoaded();
	loadMapData(mapId);
	makeEmptyMap();
	isMapLoaded();
	onLoad(object);
	extractMetadata(data);
	checkError();
	isBattleTest();
	isEventTest();
	isSkill(item);
	isItem(item);
	isWeapon(item);
	isArmor(item);
	createGameObjects();
	setupNewGame();
	setupBattleTest();
	setupEventTest();
	loadGlobalInfo();
	saveGlobalInfo(info);
	isThisGameFile(savefileId);
	isAnySavefileExists();
	latestSavefileId();
	loadAllSavefileImages();
	loadSavefileImages(info);
	maxSavefiles();
	saveGame(savefileId);
	loadGame(savefileId);
	loadSavefileInfo(savefileId);
	lastAccessedSavefileId();
	saveGameWithoutRescue(savefileId);
	loadGameWithoutRescue(savefileId);
	selectSavefileForNewGame();
	makeSavefileInfo();
	makeSaveContents();
	extractSaveContents(contents);
}

declare class xhr {
	onload();
}

declare class ConfigManager {
	bgmVolume;
	bgsVolume;
	meVolume;
	seVolume;
	load();
	save();
	makeData();
	applyData(config);
	readFlag(config, name);
	readVolume(config, name);
}

//-----------------------------------------------------------------------------
// StorageManager
//
// The static class that manages storage for saving game data.
declare class StorageManager {
	save(savefileId, json);
	load(savefileId);
	exists(savefileId);
	remove(savefileId);
	backup(savefileId);
	backupExists(savefileId);
	cleanBackup(savefileId);
	restoreBackup(savefileId);
	isLocalMode();
	saveToLocalFile(savefileId, json);
	loadFromLocalFile(savefileId);
	loadFromLocalBackupFile(savefileId);
	localFileBackupExists(savefileId);
	localFileExists(savefileId);
	removeLocalFile(savefileId);
	saveToWebStorage(savefileId, json);
	loadFromWebStorage(savefileId);
	loadFromWebStorageBackup(savefileId);
	webStorageBackupExists(savefileId);
	webStorageExists(savefileId);
	removeWebStorage(savefileId);
	localFileDirectoryPath();
	localFilePath(savefileId);
	webStorageKey(savefileId);
}

//-----------------------------------------------------------------------------
// ImageManager
//
// The static class that loads images, creates bitmap objects and retains them.
declare class ImageManager {

//undefined
	_generateCacheKey(path, hue?);

//undefined
	loadAnimation(filename, hue?);

//undefined
	loadBattleback1(filename, hue?);

//undefined
	loadBattleback2(filename, hue?);

//undefined
	loadEnemy(filename, hue?);

//undefined
	loadCharacter(filename, hue?);

//undefined
	loadFace(filename, hue?);

//undefined
	loadParallax(filename, hue?);

//undefined
	loadPicture(filename, hue?);

//undefined
	loadSvActor(filename, hue?);

//undefined
	loadSvEnemy(filename, hue?);

//undefined
	loadSystem(filename, hue?);

//undefined
	loadTileset(filename, hue?);

//undefined
	loadTitle1(filename, hue?);

//undefined
	loadTitle2(filename, hue?);

//undefined
	loadBitmap(folder, filename, hue?, smooth?);
	loadEmptyBitmap();

//undefined
	loadNormalBitmap(path, hue?);
	clear();
	isReady();
	isObjectCharacter(filename);
	isBigCharacter(filename);
	isZeroParallax(filename);

//undefined
	reserveAnimation(filename, hue?, reservationId?);

//undefined
	reserveBattleback1(filename, hue?, reservationId?);

//undefined
	reserveBattleback2(filename, hue?, reservationId?);

//undefined
	reserveEnemy(filename, hue?, reservationId?);

//undefined
	reserveCharacter(filename, hue?, reservationId?);

//undefined
	reserveFace(filename, hue?, reservationId?);

//undefined
	reserveParallax(filename, hue?, reservationId?);

//undefined
	reservePicture(filename, hue?, reservationId?);

//undefined
	reserveSvActor(filename, hue?, reservationId?);

//undefined
	reserveSvEnemy(filename, hue?, reservationId?);

//undefined
	reserveSystem(filename, hue?, reservationId?);

//undefined
	reserveTileset(filename, hue?, reservationId?);

//undefined
	reserveTitle1(filename, hue?, reservationId?);

//undefined
	reserveTitle2(filename, hue?, reservationId?);

//undefined
	reserveBitmap(folder, filename, hue?, smooth?, reservationId?);

//undefined
	reserveNormalBitmap(path, hue?, reservationId?);
	releaseReservation(reservationId);
	setDefaultReservationId(reservationId);

//undefined
	requestAnimation(filename, hue?);

//undefined
	requestBattleback1(filename, hue?);

//undefined
	requestBattleback2(filename, hue?);

//undefined
	requestEnemy(filename, hue?);

//undefined
	requestCharacter(filename, hue?);

//undefined
	requestFace(filename, hue?);

//undefined
	requestParallax(filename, hue?);

//undefined
	requestPicture(filename, hue?);

//undefined
	requestSvActor(filename, hue?);

//undefined
	requestSvEnemy(filename, hue?);

//undefined
	requestSystem(filename, hue?);

//undefined
	requestTileset(filename, hue?);

//undefined
	requestTitle1(filename, hue?);

//undefined
	requestTitle2(filename, hue?);

//undefined
	requestBitmap(folder, filename, hue?, smooth?);

//undefined
	requestNormalBitmap(path, hue?);
	update();
	clearRequest();
}

declare class AudioManager {
	masterVolume;
	bgmVolume;
	bgsVolume;
	meVolume;
	seVolume;
	playBgm(bgm, pos);
	playEncryptedBgm(bgm, pos);
	createDecryptBuffer(url, bgm, pos);
	replayBgm(bgm);
	isCurrentBgm(bgm);
	updateBgmParameters(bgm);
	updateCurrentBgm(bgm, pos);
	stopBgm();
	fadeOutBgm(duration);
	fadeInBgm(duration);
	playBgs(bgs, pos);
	replayBgs(bgs);
	isCurrentBgs(bgs);
	updateBgsParameters(bgs);
	updateCurrentBgs(bgs, pos);
	stopBgs();
	fadeOutBgs(duration);
	fadeInBgs(duration);
	playMe(me);
	updateMeParameters(me);
	fadeOutMe(duration);
	stopMe();
	playSe(se);
	updateSeParameters(buffer, se);
	stopSe();
	playStaticSe(se);
	loadStaticSe(se);
	isStaticSe(se);
	stopAll();
	saveBgm();
	saveBgs();
	makeEmptyAudioObject();
	createBuffer(folder, name);
	updateBufferParameters(buffer, configVolume, audio);
	audioFileExt();
	shouldUseHtml5Audio();
	checkErrors();
	checkWebAudioError(webAudio);
}

//-----------------------------------------------------------------------------
// SoundManager
//
// The static class that plays sound effects defined in the database.
declare class SoundManager {
	preloadImportantSounds();
	loadSystemSound(n);
	playSystemSound(n);
	playCursor();
	playOk();
	playCancel();
	playBuzzer();
	playEquip();
	playSave();
	playLoad();
	playBattleStart();
	playEscape();
	playEnemyAttack();
	playEnemyDamage();
	playEnemyCollapse();
	playBossCollapse1();
	playBossCollapse2();
	playActorDamage();
	playActorCollapse();
	playRecovery();
	playMiss();
	playEvasion();
	playMagicEvasion();
	playReflection();
	playShop();
	playUseItem();
	playUseSkill();
}

//-----------------------------------------------------------------------------
// TextManager
//
// The static class that handles terms and messages.
declare class TextManager {
	basic(basicId);
	param(paramId);
	command(commandId);
	message(messageId);
	getter(method, param);
	currencyUnit;
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
	_getTimeInMsWithoutMobileSafari();
	run(sceneClass);
	initialize();
	initGraphics();
	preferableRendererType();
	shouldUseCanvasRenderer();
	checkWebGL();
	checkFileAccess();
	initAudio();
	initInput();
	initNwjs();
	checkPluginErrors();
	setupErrorHandlers();
	requestUpdate();
	update();
	terminate();
	onError(e);
	onKeyDown(event);
	catchException(e);
	tickStart();
	tickEnd();
	updateInputData();
	updateMain();
	updateManagers();
	changeScene();
	updateScene();
	renderScene();
	onSceneCreate();
	onSceneStart();
	onSceneLoading();
	isSceneChanging();
	isCurrentSceneBusy();
	isCurrentSceneStarted();
	isNextScene(sceneClass);
	isPreviousScene(sceneClass);
	goto(sceneClass);
	push(sceneClass);
	pop();
	exit();
	clearStack();
	stop();
	prepareNextScene();
	snap();
	snapForBackground();
	backgroundBitmap();
	resume();
}

//-----------------------------------------------------------------------------
// BattleManager
//
// The static class that manages battle progress.
declare class BattleManager {
	setup(troopId, canEscape, canLose);
	initMembers();
	isBattleTest();
	setBattleTest(battleTest);
	setEventCallback(callback);
	setLogWindow(logWindow);
	setStatusWindow(statusWindow);
	setSpriteset(spriteset);
	onEncounter();
	ratePreemptive();
	rateSurprise();
	saveBgmAndBgs();
	playBattleBgm();
	playVictoryMe();
	playDefeatMe();
	replayBgmAndBgs();
	makeEscapeRatio();
	update();
	updateEvent();
	updateEventMain();
	isBusy();
	isInputting();
	isInTurn();
	isTurnEnd();
	isAborting();
	isBattleEnd();
	canEscape();
	canLose();
	isEscaped();
	actor();
	clearActor();
	changeActor(newActorIndex, lastActorActionState);
	startBattle();
	displayStartMessages();
	startInput();
	inputtingAction();
	selectNextCommand();
	selectPreviousCommand();
	refreshStatus();
	startTurn();
	updateTurn();
	processTurn();
	endTurn();
	isForcedTurn();
	updateTurnEnd();
	getNextSubject();
	allBattleMembers();
	makeActionOrders();
	startAction();
	updateAction();
	endAction();
	invokeAction(subject, target);
	invokeNormalAction(subject, target);
	invokeCounterAttack(subject, target);
	invokeMagicReflection(subject, target);
	applySubstitute(target);
	checkSubstitute(target);
	isActionForced();
	forceAction(battler);
	processForcedAction();
	abort();
	checkBattleEnd();
	checkAbort();
	checkAbort2();
	processVictory();
	processEscape();
	processAbort();
	processDefeat();
	endBattle(result);
	updateBattleEnd();
	makeRewards();
	displayVictoryMessage();
	displayDefeatMessage();
	displayEscapeSuccessMessage();
	displayEscapeFailureMessage();
	displayRewards();
	displayExp();
	displayGold();
	displayDropItems();
	gainRewards();
	gainExp();
	gainGold();
	gainDropItems();
}

//-----------------------------------------------------------------------------
// PluginManager
//
// The static class that manages the plugins.
declare class PluginManager {
	setup(plugins);
	checkErrors();
	parameters(name);
	setParameters(name, parameters);
	loadScript(name);
	onError(e);
}

