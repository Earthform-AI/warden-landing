We gather the following events from the stripe webhook

Occurs whenever a customer is signed up for a new plan.

Occurs whenever a customer's subscription ends.

Occurs whenever a customer's subscription is paused. Only applies when subscriptions enter status=paused, not when payment collection is paused.

Occurs whenever a customer's subscription's pending update is applied, and the subscription is updated.

Occurs whenever a customer's subscription's pending update expires before the related invoice is paid.

Occurs whenever a customer's subscription is no longer paused. Only applies when a status=paused subscription is resumed, not when payment collection is resumed.

Occurs three days before a subscription's trial period is scheduled to end, or when a trial is ended immediately (using trial_end=now).

Occurs whenever a subscription changes (e.g., switching from one plan to another, or changing the status from trial to active).

Occurs whenever a new invoice is created. To learn how webhooks can be used with this event, and how they can affect it, see Using Webhooks with Subscriptions.

Occurs X number of days before a subscription is scheduled to create an invoice that is automatically charged—where X is determined by your subscriptions settings. Note: The received Invoice object will not have an invoice ID.

Occurs whenever a subscription schedule is canceled due to the underlying subscription being canceled because of delinquency.

Occurs whenever a subscription schedule is canceled.

Occurs whenever a new subscription schedule is completed.

Occurs whenever a new subscription schedule is created.

Occurs 7 days before a subscription schedule will expire.

Occurs whenever a new subscription schedule is released.

Occurs whenever a subscription schedule is updated.
