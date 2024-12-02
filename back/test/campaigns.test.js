const Campaigns = artifacts.require("Campaigns");

contract("Campaigns", (accounts) => {
  const creator = accounts[0];
  const contributor = accounts[1];
  const contributionAmount = web3.utils.toWei("1", "ether");

  let instance;

  before(async () => {
    instance = await Campaigns.new();
  });

  it("debería crear una campaña nueva", async () => {
    const targetAmount = web3.utils.toWei("5", "ether");
    const daysDeadline = 7;

    const tx = await instance.createNewCampaign(
      targetAmount,
      daysDeadline,
      "Test Campaign",
      {
        from: creator,
      }
    );

    // Verifica que el evento fue emitido correctamente
    const event = tx.logs.find((log) => log.event === "NewCampaign");
    assert(event, "Evento 'NewCampaign' no encontrado");
    assert.equal(
      event.args.name,
      "Test Campaign",
      "El nombre de la campaña no coincide"
    );
  });

  it("debería permitir contribuciones a una campaña activa", async () => {
    const campaignId = 0; // Primera campaña creada

    const tx = await instance.contribute(campaignId, {
      from: contributor,
      value: contributionAmount,
    });

    // Verifica que el evento fue emitido
    const event = tx.logs.find((log) => log.event === "ContributionReceived");
    assert(event, "Evento 'ContributionReceived' no encontrado");
    assert.equal(
      event.args.campaignId.toNumber(),
      campaignId,
      "El ID de la campaña no coincide"
    );
    assert.equal(
      event.args.amount.toString(),
      contributionAmount,
      "El monto de la contribución no coincide"
    );

    // Verifica el monto acumulado en la campaña
    const campaign = await instance.campaigns(campaignId);
    assert.equal(
      campaign.current_amount.toString(),
      contributionAmount,
      "El monto acumulado es incorrecto"
    );
  });

  it("debería devolver las contribuciones de un usuario", async () => {
    const contributions = await instance.getContributions(contributor);
    const campaignIds = contributions[0];
    const amounts = contributions[1];

    assert.equal(
      campaignIds.length,
      1,
      "El usuario debería tener exactamente 1 contribución registrada"
    );
    assert.equal(
      campaignIds[0].id_campaign,
      0,
      "El ID de la campaña no coincide"
    );
    assert.equal(
      amounts[0].toString(),
      contributionAmount,
      "El monto de la contribución no coincide"
    );
  });

  it("debería cancelar una campaña y reembolsar a los contribuyentes", async () => {
    const campaignId = 0; // Primera campaña creada

    // Cancelar campaña desde la cuenta del creador
    const balanceBefore = await web3.eth.getBalance(contributor);

    const tx = await instance.cancelCampaign(campaignId, { from: creator });
    const event = tx.logs.find((log) => log.event === "CampaignCancelled");
    assert(event, "Evento 'CampaignCancelled' no encontrado");

    // Verifica que el estado de la campaña sea 'Failed'
    const campaign = await instance.campaigns(campaignId);
    assert.equal(
      campaign.state.toString(),
      "2",
      "El estado de la campaña debería ser 'Failed'"
    );

    // Verifica que el contribuyente recibió su reembolso
    const balanceAfter = await web3.eth.getBalance(contributor);
    assert(
      web3.utils.toBN(balanceAfter).gt(web3.utils.toBN(balanceBefore)),
      "El balance del contribuyente no aumentó tras el reembolso"
    );
  });
});
